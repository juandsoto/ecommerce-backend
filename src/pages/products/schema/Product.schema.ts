import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is a required field"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "price is a required field"],
    },
    weight: {
      type: Number,
      required: [true, "weight is a required field"],
    },
    description: {
      type: String,
      required: [true, "description is a required field"],
    },
    thumbnail: {
      type: String,
    },
    images: [
      {
        type: String,
        required: [true, "images is a required field"],
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Categories",
        required: [true, "category is a required field"],
      },
    ],
    stock: {
      type: Number,
      required: [true, "stock is a required field"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Products", ProductSchema);
