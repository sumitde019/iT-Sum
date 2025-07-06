import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  console.log("hello");
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Verify Component Mounted");
    console.log("Success:", success, "Order ID:", orderId);
  
    const verifyPayment = async () => {
      if (!success || !orderId) {
        console.error("Missing query params: success or orderId is null");
        return;
      }
  
      try {
        console.log("Sending API Request to:", `${url}/api/order/verify`);
        const response = await axios.get(`${url}/api/order/verify`, { success, orderId });
  
        console.log("API Response:", response.data);
  
        if (response.data && response.data.success) {
          console.log("Redirecting to /myorders...");
          navigate("/myorders");
        } else {
          console.log("Redirecting to /...");
          navigate("/");
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
        navigate("/");
      }
    };
  
    verifyPayment();
  }, [success, orderId, url, navigate]);
  

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
