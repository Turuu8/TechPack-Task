import { Schema, models, model } from "mongoose";

const CVschema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  general: {
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
    gender: {
      type: String,
    },
  },
  connect: {
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  planWork: {
    salary: {
      type: String,
    },
    workingType: {
      type: String,
    },
    job: {
      type: String,
    },
  },
  education: [
    {
      degree: { type: String },
      country: { type: String },
      schoolName: { type: String },
      occupation: { type: String },
      gpa: { type: String },
      startYear: { type: String },
      endYear: { type: String },
    },
  ],
});

const CV = models.CV || model("CV", CVschema);

export default CV;
