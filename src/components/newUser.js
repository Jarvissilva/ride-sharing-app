"use client";
import Link from "next/link";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { newUser } from "actions/user";
import { redirect } from "next/navigation";

export default function NewUser() {
  const [state, formAction] = useFormState(newUser, {
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
          console.log(state);
          if (state.success) {
            formRef.current.reset();
            redirect("/");
          }
        }}
      >
        <div>
          <p>{state.message}</p>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <label>Name</label>
          <input
            className="rounded-md border p-4"
            type="text"
            name="name"
            placeholder="Enter your name"
          />
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
          Register
        </button>
        <p>
          Already have a account?{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
