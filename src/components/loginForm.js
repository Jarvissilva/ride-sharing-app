"use client";
import Link from "next/link";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";
import { loginUser } from "actions/auth";

export default function LoginForm() {
  const [state, formAction] = useFormState(loginUser, {
    success: false,
    message: "",
  });
  const formRef = useRef();
  return (
    <>
      <form
        className="flex flex-col items-center justify-center gap-4 p-4"
        ref={formRef}
        action={async (formData) => {
          await formAction(formData);
          if (state.success) {
            redirect("/");
          }
        }}
      >
        <div>
          <p>{state.message}</p>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <label>Email</label>
          <input
            className="rounded-md border p-4"
            type="text"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <label>Password</label>
          <input
            className="rounded-md border p-4"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 p-4 font-bold text-white"
        >
          Login
        </button>
        <p>
          Don't have a account?{" "}
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </>
  );
}
