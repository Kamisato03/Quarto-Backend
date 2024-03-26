import mongoose from "mongoose";

const { Schema, model } = mongoose;

const dataRoomSchema = new Schema({
  type: {
    type: Schema.Types.ObjectId,
    ref: 'TypeRoom',
    required: true,
  },
  numGuests: {
    type: Number,
    required: true,
  },
  numRooms: {
    type: Number,
    required: true,
  },
  numBeds: {
    type: Number,
    required: true,
  },
  numBath: {
    type: Number,
    required: true,
  },
});

export const DataRoom = model('DataRoom', dataRoomSchema);
