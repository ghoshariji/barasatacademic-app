import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../customcss/payment.css";
import img from "../images/payment-card.jpeg"
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
  //http://localhost:3000/gateway-integration-payment/V1/321/fsddfds78vcx/security-allow-allregistion/321/321321/854587877fdsdssdsf/rwhefdfdsf/8844/321132/321321/8999/1233/dshdadghjasg/2732544543eww/321/jdasdjkldsa55545/7473hdhdhsahgh/dsasadaa%22
  return (


   <div className="main">


    <div className="payment-card">
      <div className="image">
        <img src={img} alt="" className="payment-pic" />
      </div>

      <div className="payment-data">
        <h2>Make Payment</h2>
        <span>Price is: {price}</span>
      </div>
      <div className="row">
        <div className="info">
          <h3>Email</h3>
          <span>{email}</span>
        </div>
        <div className="info">
          <h3>Name</h3>
          <span>{namegoestothere}</span>
        </div>
        <div className="info">
          <h3>Course</h3>
          <span>{forgettingjobgoodthis}</span>
        </div>
      </div>
      <div className="pay-btn">
        <button className="btn100" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>

    </div>
    


  );
};

export default Payment;
