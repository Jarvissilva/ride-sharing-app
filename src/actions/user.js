"use server";
import connectDatabase from "utilities/connectDatabase";
import UserModel from "models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function newUser(_, formData) {
  try {
    console.log("hello");

    await connectDatabase();
    console.log("hello");
    console.log(formData.get("name"));
    const newUser = await new UserModel({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    }).save();

    const authToken = jwt.sign(
      { _id: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    cookies().set({
      name: "auth",
      value: authToken,
      httpOnly: true,
      path: "/",
      sameSite: "Strict",
      maxAge: 604800,
    });

    return { success: true, message: "User successfully created" };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
}
export async function getUser(id) {
  try {
    await connectDatabase();

    const foundUser = await UserModel.findOne({ _id: id });

    if (!foundUser)
      return { success: false, message: "User not found", user: null };

    return JSON.parse(JSON.stringify({ success: true, user: foundUser }));
  } catch (error) {
    return { success: false, message: error.message, user: null };
  }
}
