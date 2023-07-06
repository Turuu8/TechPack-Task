import { Schema, model, models } from "mongoose";

const JobSchema = new Schema({
  jobName: {
    type: String,
    required: [true, "Jobs is required!"],
  },
});

const Job = models.Job || model("Job", JobSchema);

export default Job;
