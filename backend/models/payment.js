import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    razorpay_order_id: {
      type: String,
      required: true
    },
    razorpay_payment_id: {
      type: String
    },
    razorpay_signature: {
      type: String
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: "INR"
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
