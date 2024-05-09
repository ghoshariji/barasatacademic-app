import React from "react";
import { useParams } from "react-router-dom";

const Confirmpayment = () => {
  const { razorPayId } = useParams();
  return (
    <div>
      <h1>Razorpay id {razorPayId}</h1>
    </div>
  );
};

export default Confirmpayment;
