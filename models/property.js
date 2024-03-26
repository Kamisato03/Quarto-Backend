import mongoose from "mongoose";

const { Schema, model } = mongoose;

const propertySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [{
    path: String,
    description: String,
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  benefits: {
    type: Schema.Types.ObjectId,
    ref: "Benefits",
    required: true,
  },
  ratings: {
    type: Schema.Types.ObjectId,
    ref: "Ratings",
    required: true,
  },
});

export const Property = model("Property", propertySchema);
