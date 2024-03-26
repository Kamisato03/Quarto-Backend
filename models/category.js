import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new mongoose.Schema({
    name: String,
    description: String
  });
  
  module.exports = mongoose.model('Category', categorySchema);