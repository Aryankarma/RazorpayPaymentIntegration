import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { paymentId, signatureId, orderId, notes, amount } = location.state || {};

  // Redirect if paymentId is missing
  useEffect(() => {
    if (!paymentId) {
      console.log("Payment data missing, redirecting...");
      navigate('/');
    }
  }, [paymentId, navigate]);


  if(!paymentId){
    return ;
  }

  return (
    <div>
      <div className="flex items-center justify-center h-max w-max bg-green-50">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
          <svg
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 1a9 9 0 100 18 9 9 0 000-18zm1.5 13.25l-4-4 1.25-1.25 2.75 2.75 5-5L15.5 9l-4 4.25z" />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800">
            Transaction Successful!
          </h2>
          <p className="text-gray-600 mt-2">
            Your transaction has been completed successfully.
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Payment ID:{" "} 
              <span className="font-semibold text-gray-800">{paymentId}</span>
            </p>
            <p className="text-sm text-gray-500">
              Amount: <span className="font-semibold text-gray-800">{amount} ₹</span>
            </p>
            <p className="text-sm text-gray-500">Note: <span className="font-semibold text-gray-800">{notes[0]}</span></p>
          </div>
          <a
            href="/"
            className="mt-6 inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
