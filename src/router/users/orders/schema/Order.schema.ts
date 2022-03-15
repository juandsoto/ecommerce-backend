import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "user_id is a required field"],
    },
    products: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: [true, "product_id is a required field"],
        },
        qty: { type: Number, default: 1 },
        discount: { type: Number, default: 0 },
        total_price: { type: Number },
      },
    ],
    qty: {
      type: Number,
    },
    total_price: {
      type: Number,
    },
    shipping_address: {
      type: String,
    },
    order_address: {
      type: String,
    },
    order_email: {
      type: String,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "on the way", "delivered", "cancelled"],
        message: "invalid status, try one of pending - on the way - delivered - cancelled",
      },
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Orders", OrderSchema);
