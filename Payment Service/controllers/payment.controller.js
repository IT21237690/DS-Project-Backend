import Payment from "../models/payment.model.js";

export const createPayment = async (req, res) => {
    try {
      const { paymentID, userID, courseCode } = req.params; // Extract data from request params
  
      // Validation (optional, add additional checks as needed)
      if (!paymentID || !userID || !courseCode) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const newPayment = new Payment({
        paymentID,
        userID,
        courseCode
      });
  
      const savedPayment = await newPayment.save();
      res.status(201).json(savedPayment); // Send created payment in response
  
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' }); // Handle errors gracefully
    }
};