import mongoose from "mongoose";
const { Schema, model } = mongoose;

const propertySchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    images: [{
        path: String,
        description: String
      }],
    Type: schema.Types.Objectid, ref: "category",
    Type: schema.Types.Objectid, ref: "location",
    Type: schema.Types.Objectid, ref: "benefits",
    Type: schema.Types.Objectid, ref: "ratings"
});
  
  module.exports = mongoose.model('Property', propertySchema);