import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    first_name: {
      type: String,
      min: 2,
      max: 25,
      required: true,
    },
    last_name: {
      type: String,
      min: 2,
      max: 25,
      required: true,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    billing_address: {
      type: String,
      required: true,
    },
    shipping_address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Users", UserSchema);
