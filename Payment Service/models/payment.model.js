import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    paymentID: {
        type: String,
        required: true,
        unique: true,
    },
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    courseCode: {
        type: String,
        required: true,
        unique: true,
    }
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;