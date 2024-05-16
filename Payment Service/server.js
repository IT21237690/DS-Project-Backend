import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import path from "path";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv'

import connectToMongoDB from "./db/ConnectToMongoDB.js";
import paymentRoutes from "./routes/payment.routes.js";



const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 5003 } = process.env;
const base = "https://api-m.sandbox.paypal.com";
const app = express();

// host static files
app.use(express.static("client/dist"));

// parse post params sent in body in json format
app.use(express.json());
app.use(cors());

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

const checkPermission = async (token) => {
  try {
    const response = await axios.get('http://service1:5000/authorize', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { authorized, role, sid } = response.data;
    
    if (authorized && role === 'student') {
      return { authorized: true, sid };
    } else {
      return { authorized: false };
    }
  } catch (error) {
    console.error('Error checking permission:', error);
    return { authorized: false };
  }
};

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (cart,afterPrice) => {
  // use the cart information passed from the front-end to calculate the purchase unit details

  // console.log(afterPrice, "This is afterPrice")
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: afterPrice,
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });


  return handleResponse(response);
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID,courseCode,permission) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });


  console.log(courseCode)
  console.log(permission.sid)

  const paymentResponse = await axios.post(`http://service4:5003/api/payment/createPayment/${orderID}/${permission.sid}/${courseCode}`, {

  });

   const enrollResponse = await axios.post(`http://service2:5001/api/user/enroll/${courseCode}/${permission.sid}`, {
      
    });


  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

app.post("/api/orders/:courseCode", async (req, res) => {
  try {
    const { courseCode } = req.params;

    async function fetchCourse() {
      try {
        const response = await axios.get('http://service3:5002/api/course/get/' + `${courseCode}`);
        return response.data.price.replace("$", "");
      } catch (error) {
        console.error('Error fetching courses:', error);
        throw error; // Re-throw the error for handling in createOrder
      }
    }

    const afterPrice = await fetchCourse(); // Wait for fetchCourse to resolve

    const { cart } = req.body;
    // console.log(cart, afterPrice); // Verify afterPrice here

    const { jsonResponse, httpStatusCode } = await createOrder(cart, afterPrice);

    res.status(httpStatusCode).json(jsonResponse);

  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.post("/api/orders/:orderID/capture/:courseCode", async (req, res) => {
  try {

    const {courseCode} = req.params;
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    const permission = await checkPermission(token);
    // console.log(courseCode)
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID,courseCode,permission);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

// serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./client/dist/index.html"));
});

app.use('/api/payment', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
  connectToMongoDB()
});
