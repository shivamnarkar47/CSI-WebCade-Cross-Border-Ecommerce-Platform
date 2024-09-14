import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "buyer",
  },
  country: {
    type: String,
    default: "india"

  }
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
