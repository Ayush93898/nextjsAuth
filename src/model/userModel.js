import mongoose from "mongoose"; //s-1

//s-2 design user-model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a usernmae"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a valid password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema); // s-3
export default User;
