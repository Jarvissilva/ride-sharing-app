import LoginForm from "components/loginForm";
import { Redressed } from "next/font/google";
import Link from "next/link";

const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function Login() {
  return (
    <>
      <main className="mt-20 flex h-lvh flex-col items-center gap-8">
        <h1 className={`text-5xl ${redressed.className}`}>DuoDrive</h1>
        <LoginForm />
      </main>
    </>
  );
}
