import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Product description is required"]
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be greater than or equal to 0"]
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"]
    },
    category: {
      type: String,
      required: [true, "Category is required"]
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"]
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
