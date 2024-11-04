import { Redressed } from "next/font/google";

import NewUser from "components/newUser";

const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default async function Register() {
  return (
    <>
      <main className="mt-20 flex h-lvh flex-col items-center gap-8">
        <h1 className={`text-5xl ${redressed.className}`}>DuoDrive</h1>
        <NewUser />
      </main>
    </>
  );
}
