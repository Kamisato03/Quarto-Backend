import mongoose from "mongoose";

const { Schema, model } = mongoose;

const typeRoomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const TypeRoom = model("TypeRoom", typeRoomSchema);
