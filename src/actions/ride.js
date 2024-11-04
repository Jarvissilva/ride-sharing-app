"use server";
import connectDatabase from "utilities/connectDatabase";
import RideModel from "models/ride";

export async function newRide(_, formData) {
  try {
    await connectDatabase();

    const newRide = new RideModel({
      taluka: formData.get("taluka"),
      origin: formData.get("origin"),
      destination: formData.get("destination"),
      date: formData.get("date"),
      time: formData.get("time"),
      seats: formData.get("seats"),
      vehicleName: formData.get("vehicle-name"),
      vehicleType: formData.get("vehicle-type"),
      price: formData.get("price"),
      contact: formData.get("contact") || "",
      author: formData.get("author"),
    });

    await newRide.save();

    return { success: true, message: "Ride successfully created" };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
}
export async function getRides(_, formData) {
  try {
    await connectDatabase();
    const foundRides = await RideModel.find().populate("author", "name").exec();

    return {
      success: true,
      rides: foundRides,
      message: "Ride successfully created",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
}
