"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDatabase from "utilities/connectDatabase";
import UserModel from "models/user";

export async function loginUser(_, formData) {
  try {
    await connectDatabase();

    const foundUser = await UserModel.findOne({ email: formData.get("email") });
    console.log(foundUser);
    if (!foundUser)
      return {
        success: false,
        message: "User does not exists with this email",
      };
    console.log(foundUser.password);
    if (foundUser.password !== formData.get("password")) {
      return {
        success: false,
        message: "Invalid Login Credentials",
      };
    }

    const authToken = jwt.sign(
      { _id: foundUser._id },
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

    return {
      success: true,
      message: "You are logged in",
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export async function getLoggedUser() {
  try {
    const authCookie = cookies().get("auth");

    if (!authCookie) return { success: false, message: "User not logged in" };

    const decodedToken = jwt.verify(
      authCookie.value,
      process.env.JWT_SECRET_KEY
    );

    await connectDatabase();
    const foundUser = await UserModel.findById(decodedToken._id);

    if (!foundUser)
      return {
        success: false,
        message: "User does not exist",
      };

    return JSON.parse(JSON.stringify({ success: true, user: foundUser }));
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function logout() {
  cookies().delete("auth");
}
