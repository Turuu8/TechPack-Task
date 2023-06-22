import { Schema, models, model } from "mongoose";

const CVschema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  aboutMe: {
    type: String,
  },
  lastName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  idNumber: {
    type: String,
  },
  birthday: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  salary: {
    type: String,
  },
  gender: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  enrollmentYear: {
    type: String,
  },
  graduatedYear: {
    type: String,
  },
  level: {
    type: String,
  },
  schoolName: {
    type: String,
  },
  job: {
    type: String,
  },
});

const CV = models.CV || model("CV", CVschema);

export default CV;
