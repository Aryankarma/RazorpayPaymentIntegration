import { useState, useEffect, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./components/ui/textarea";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [amount, setAmount] = useState<number>(1);
  const [note, setNote] = useState<string>("");
  const [transactionDetails, setTransactionDetails] = useState<object>({}); // State to store transaction details like id and notes
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const navigate = useNavigate();

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    console.log(transactionDetails);
  }, [transactionDetails]);

  const InitiatePayment = async (
    e: FormEvent<HTMLFormElement>,
    payAmount: number,
    note: string
  ) => {
    e.preventDefault();
    console.log({ payAmount, note });

    try {
      const response = await axios.post("https://razorpaypaymentintegration.onrender.com/create-order", {
        payAmount,
        currency: "INR",
        note,
        reciept: `order_rcptid_${Date.now()}`,
      });

      if (response.status == 200) {
        console.log("Order Created ", response.data);
        const {
          id: order_id,
          notes: notes,
          amount: amountRecieved,
        } = response.data;
        setTransactionDetails({
          id: order_id,
          notes: notes,
          amount: amountRecieved,
        });

        const options = {
          key: import.meta.env.VITE_RAZORPAY_API_KEY,
          amount: amountRecieved,
          currency: "INR",
          name: "Test Transaction",
          description: "Test Transaction",
          order_id: order_id,
          prefill: {
            name: "Aryan Karma",
            email: "aryankarma29@gmail.com",
            contact: "9098569620",
          },
          theme: {
            color: "#F37254",
          },
          handler: async function (response: any) {

            console.log("Payment Success: ", response);

            const paymentData = {
              paymentId: response.razorpay_payment_id,
              signatureId: response.razorpay_signature, 
              orderId: order_id,
              amount: amountRecieved / 100,  // Convert back to the original amount
              notes: notes,
            };
          
            try {
              await axios.post("https://razorpaypaymentintegration.onrender.com/paymentsuccess", paymentData);
              console.log("Transaction data sent to backend");
          
              // Navigate to success page
              navigate("/paymentsuccess", {
                state: paymentData,
              });
            } catch (error) {
              console.error("Error sending payment data to backend: ", error);
            }          
          },
          onPaymentFailed: function (error: any) {
            console.error("Payment failed: ", error);
            alert(
              `Payment failed: ${error.error.description} (Code: ${error.error.code})`
            );
          },
          modal: {
            ondismiss: function () {
              console.log("Payment widget dismissed");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error("failed to initiate payment.", response.data);
      }
    } catch (error) {
      console.error("Error initiating payment: ", error);
    }
  };

  if(!isScriptLoaded){
    return <h1 className="text-2xl"> Loading... </h1>
  }

  return (
    <div className="p-6 border-2 rounded-xl border-black-100">
      <h1 className="text-2xl font-bold mb-6 text-center">RazorPay Payment!</h1>
      <form
        className=" p-3 flex align-center justify-center w-full h-full flex-col gap-3"
        action="post"
        onSubmit={(e) => InitiatePayment(e, amount, note)}
      >
        <Input
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount to pay"
          type="number"
          autoFocus
          required
          min={1}
        />
        <Textarea
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter Note"
          typeof="text"
        />
        <Button type="submit">Pay Now</Button>
      </form>
    </div>
  );
}

export default App;
