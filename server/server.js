// server.js

import express from 'express'
import admin from 'firebase-admin'
import serviceAccount from './config/firebaseServiceAccount.json' assert {type:"json"}

const app = express();

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();  // Firestore instance

// Sample route to store data in Firestore
app.post('/save-transaction', async (req, res) => {
  try {
    const { paymentId, amount } = req.body;

    // Store transaction details in Firestore
    await db.collection('transactions').add({
      paymentId,
      amount,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).send('Transaction stored successfully');
  } catch (error) {
    res.status(500).send('Error storing transaction');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
