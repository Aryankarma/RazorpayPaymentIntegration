// server.js

import express from "express";
import admin from "firebase-admin";
import serviceAccount from "./config/firebaseServiceAccount.json" assert { type: "json" };
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from 'dotenv'

const app = express()
app.use(express.json())
dotenv.config()

app.use(
  cors({
    origin: "*",
  })
);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initiate Razorpay
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// // get payment history
// instance.payments.all({
//   from: '2016-08-01',
//   to: '2025-08-20'
// }).then((response) => {
//   console.log(response)
// }).catch((error) => {
//   // handle error
// })

const db = admin.firestore(); // Firestore instance

app.post("/", (req, res) => {
  const { payAmount } = req.body;
  console.log("payment amount: ", payAmount);
  res.status(200).send("Payment initiated successfully");
});

app.post("/create-order", async (req, res) => {
  const { payAmount, currency, receipt, note } = req.body;

  var options = {
    amount: payAmount * 100, // amount in the smallest currency unit
    currency: currency,
    receipt: receipt,
    notes: [note],
  };

  try {
    const order = await instance.orders.create(options);
    console.log("Order Created: ", order);
    res.status(200).json(order); // Send back the order details as JSON
  } catch (error) {
    console.error("Error creating order: ", error);
    res.status(500).json({ error: 'Order creation failed', details: error });
    }
});

app.post("/paymentsuccess", async (req, res) => {
  const { paymentId, signatureId, orderId, amount, notes } = req.body;

  console.log("Payment Successful: ", paymentId);

  try {
    await db.collection("transactions").add({
      paymentId,
      signatureId,
      orderId,
      amount,
      notes,
      timestamp: admin.firestore.FieldValue.serverTimestamp(), 
    });

    res.status(200).send("Payment details stored successfully");
  } catch (error) {
    console.error("Error storing payment data: ", error);
    res.status(500).send("Error storing payment data");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
