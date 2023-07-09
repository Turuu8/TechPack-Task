import { Schema, model, models } from "mongoose";

const SendSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Send = models.Send || model("Send", SendSchema);

export default Send;
