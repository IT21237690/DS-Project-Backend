import express from 'express'
import { createPayment } from '../controllers/payment.controller.js'

const router = express.Router()

//create new payment
router.post('/createPayment/:paymentID/:userID/:courseCode', createPayment);

export default router