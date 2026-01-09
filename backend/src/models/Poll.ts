
import { Schema, model } from "mongoose";

const PollSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },

  // studentId -> option
  votes: {
    type: Map,
    of: String,
    default: {}
  },

  duration: { type: Number, required: true }, // seconds
  startTime: { type: Number, required: true },
  ended: { type: Boolean, default: false }
});

export const Poll = model("Poll", PollSchema);
