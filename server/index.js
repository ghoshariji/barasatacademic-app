const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
app.use(cors())
// require("dotenv").config();
const PORT =  5000;

// Body parser middleware
app.use(express.json());

// Create a new instance of Razorpay
const instance = new Razorpay({
  key_id: "rzp_test_6Fsll3myRMs9xe",
  key_secret: "2ZxuxUnbMuIvBPz0avekYoh6",
});

// Define routes
app.post("/checkout", async (req, res) => {
  try {
    console.log(req.body);
    const options = {
      amount: Number(req.body.price * 100), // Amount should be in paise
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).send({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/paymentverification", async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");
  const isAuth = razorpay_signature === expectedSignature;
  if (isAuth) {
    // const id = req.query.id;
    // const course = req.query.courseid;
    // try {
    //   // Update user document in the database
    //   // Assuming you have defined `userModel` somewhere
    //   const user = await userModel.findByIdAndUpdate(
    //     id,
    //     { $push: { course: course } },
    //     { new: true }
    //   );
    //   // Redirect user to a success page
      res.redirect(`http://localhost:3000/verify/:${razorpay_order_id}`);
    return res.status(201).send({
      message: "Done",
    });
  }
  // } catch (error) {
  //   console.error("Error updating user:", error);
  //   res.status(500).send({ message: "Internal server error" });
  // }
  else {
    res.status(401).send({ message: "Payment failed" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
