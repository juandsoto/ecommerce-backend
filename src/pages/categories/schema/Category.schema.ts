import validator from "validator";
import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "name is a required field"],
      validate: [
        (name: string) => validator.isLength(name, { min: 3 }),
        "name must be more than 3 letters long",
      ],
    },
    description: {
      type: String,
      required: [true, "description is a required field"],
      validate: [
        (description: string) => validator.isLength(description, { min: 3 }),
        "description must be more than 3 letters long",
      ],
    },
    thumbnail: {
      type: String,
      required: [true, "thumbnail is a required field"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Category = model("Categories", CategorySchema);
