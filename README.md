Here's the README.md in markdown format:

```markdown
# RazorPay Payment Integration

This project demonstrates a full-stack implementation of RazorPay payment integration using React for the frontend and Express.js with Firebase for the backend.

## Project Structure

```
RAZORPAYPAYMENTINTEGRATION/
├── server/
│   ├── config/
│   │   └── firebaseServiceAccount.json
│   ├── node_modules/
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── ui/
│   ├── config/
│   │   └── firebaseConfig.js
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   │   └── PaymentSuccess.tsx
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── razorpay.d.ts
│   ├── .env
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/aryankarma/RazorpayPaymentIntegration.git
   cd RazorpayPaymentIntegration
   ```

2. Install dependencies for both server and client:
   ```
   cd server && npm install
   cd ../ui && npm install
   ```

3. Set up environment variables:
   - In the `server` directory, create a `.env` file with your RazorPay API keys:
     ```
     RAZORPAY_API_KEY=your_razorpay_api_key
     RAZORPAY_SECRET_KEY=your_razorpay_secret_key
     ```
   - In the `ui` directory, create a `.env` file with your RazorPay API key:
     ```
     VITE_RAZORPAY_API_KEY=your_razorpay_api_key
     ```

4. Set up Firebase:
   - Create a Firebase project and obtain the service account key
   - Place the `firebaseServiceAccount.json` in the `server/config/` directory
   - Update `ui/config/firebaseConfig.js` with your Firebase configuration

5. Start the server:
   ```
   cd server && npm start
   ```

6. Start the client:
   ```
   cd ui && npm run dev
   ```

7. Open your browser and navigate to `http://localhost:5173` to view the application.

## Features

- RazorPay payment integration
- React frontend with Tailwind CSS
- Express.js backend
- Firebase Firestore for storing transaction details
