import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Payment = () => {
  const {
    couqidsfuegotoId,
    forgettingjobgoodthis,
    namegoestothere,
    price,
    email,
    descriptioncourse
  } = useParams();
  const handlePayment = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      "http://localhost:5000/checkout",
      { price },
      config
    );
    console.log(res.data.data);
    console.log(window);
    const options = {
      key: "rzp_test_6Fsll3myRMs9xe",
      amount: res.data.data.amout,
      name: "Arijit",
      description:descriptioncourse,
      image: "https://example.com/your_logo",
      order_id: res.data.data.id,
      callback_url: `http://localhost:5000/paymentverification/?id=${couqidsfuegotoId}&courseid=${forgettingjobgoodthis}`,
      prefill: {
        name: namegoestothere,
        email: email,
      },
      notes: {
        address: "note value",
      },
      theme: {
        color: "#F37254",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    // handlePayment()
  }, []);
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
