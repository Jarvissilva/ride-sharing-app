import mongoose from "mongoose";

import UserModel from "models/user";
import RideModel from "models/ride";

const connectDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Database already connected");
    return;
  } else {
    console.log(process.env.DATABASE_CONNECTION_URI);
    return mongoose.connect(process.env.DATABASE_CONNECTION_URI);
  }
};

export default connectDatabase;
