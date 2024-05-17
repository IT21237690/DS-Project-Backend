import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    paymentID: {
        type: String
    },
    userID: {
        type: String
       
    },
    courseCode: {
        type: String
    }
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;