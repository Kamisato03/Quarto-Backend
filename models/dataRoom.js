import mongoose from "mongoose";
const { Schema, model } = mongoose;

const dataRoomSchema = new mongoose.Schema({
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TypeRoom',
      numGuests: Number,
      numRooms: Number,
      numBeds: Number,
      numBath: Number
    });
  
  module.exports = mongoose.model('DataRoom', dataRoomSchema);