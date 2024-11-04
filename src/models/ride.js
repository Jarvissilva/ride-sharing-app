import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    taluka: {
      type: String,
      required: true,
      trim: true,
    },
    origin: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    vehicleName: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleType: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      trim: true,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Ride || mongoose.model("Ride", rideSchema);
