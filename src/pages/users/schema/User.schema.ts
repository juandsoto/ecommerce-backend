import { Response } from "express";
import { Schema, model } from "mongoose";
import validator from "validator";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "email is a required field"],
      validate: [
        (email: string) => {
          // return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
          return validator.isEmail(email);
        },
        "{VALUE} is not a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "password is a required field"],
      validate: [
        (password: string) => {
          return validator.isStrongPassword(password, {
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            minLength: 6,
          });
        },
        "password field must be at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special symbol and a minimum lenght of six characters",
      ],
    },
    first_name: {
      type: String,
      required: [true, "first_name is a required field"],
      validate: [
        (value: string) => validator.isLength(value, { min: 2, max: 45 }),
        "first_name must be 2 to 45 letters long",
      ],
    },
    last_name: {
      type: String,
      min: 2,
      max: 25,
      required: [true, "last_name is a required field"],
      validate: [
        (value: string) => validator.isLength(value, { min: 2, max: 45 }),
        "last_name must be 2 to 45 letters long",
      ],
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    billing_address: {
      type: String,
      required: [true, "billing_address is a required field"],
    },
    shipping_address: {
      type: String,
      required: [true, "shipping_address is a required field"],
    },
    country: {
      type: String,
      required: [true, "country is a required field"],
    },
    phone: {
      type: String,
      required: [true, "phone is a required field"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.toJSON = function () {
  const { password, ...user } = this.toObject();
  return user;
};

export const User = model("Users", UserSchema);
