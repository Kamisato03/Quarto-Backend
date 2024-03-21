import mongoose from "mongoose";
const { Schema, model } = mongoose;

const typeRoomSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('TypeRoom', typeRoomSchema);