import mongoose from "mongoose";
const { Schema, model } = mongoose;

const dataRoomSchema = new mongoose.Schema({
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TypeRoom'
    });
  
  module.exports = mongoose.model('DataRoom', dataRoomSchema);