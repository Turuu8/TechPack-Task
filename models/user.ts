import { Schema, model, models } from "mongoose";

const UserSchema  = new Schema({
     email: { 
          type: String,
          unique: [ true , "Email is already exists!"],
          required: [ true, "Email is required!"]
     },
     username: {
          type: String,
          required: [ true, "Username is required!"],
     },
     role: {
          type: String,
          unique: false
     },
     image : { 
          type: String,
     },
     password: {
          type: String,
     }
})

const User  = models.User || model( "User" , UserSchema);

export default User;