import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email is already exists!"],
    required: [true, "Email is required!"],
  },
  phoneNumber: {
    type: String,
    required: [true, "PhoneNumber is required!"],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
    unique: false,
  },
  password: {
    unique: true,
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
