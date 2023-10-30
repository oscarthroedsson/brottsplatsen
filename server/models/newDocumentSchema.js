import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    name: {
      type: String,
      required: true,
    },
    gps: {
      type: String,
      required: true,
    },
  },
});

eventSchema.pre("save", function (next) {
  // Omvandlar datetime till Date-objekt och formaterar det som en sträng
  this.datetime = new Date(this.datetime).toISOString();
  next();
});

//todo googla .model och ("event", eventSchema")
export default mongoose.model("EventDataModel", eventSchema, "eventData");
