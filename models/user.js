import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
  
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: { unique: true },
    },
  
    password: {
      type: String,
      required: true,
    },
  
    image: {
      type: String,
    },
  
    phone: {
      type: String,
    },
  
    fileName: {
      type: String,
    },
  });
  
  userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
  
    try {
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(user.password, salt);
      next();
    } catch (error) {
      console.log(error);
      throw new Error("Fallo el hash de password");
    }
  });
  
  userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password);
  };
  
  export const User = model("User", userSchema);