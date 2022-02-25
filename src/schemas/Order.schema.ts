import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    products: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        qty: { type: Number, required: true, default: 1 },
      },
    ],
    ammount: {
      type: Number,
      required: true,
    },
    shipping_address: {
      type: String,
      required: true,
    },
    order_address: {
      type: String,
      required: true,
    },
    order_email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "on the way", "delivered", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Orders", OrderSchema);
