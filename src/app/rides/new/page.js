import { getLoggedUser } from "actions/auth";
import NewRideForm from "components/newRide";
import { redirect } from "next/navigation";

export default async function NewRide() {
  const authRes = await getLoggedUser();

  if (!authRes.success) redirect("/login");

  return (
    <>
      <div className="flex items-center justify-start gap-4 px-4">
        <button className="text-6xl">&lt;</button>
        <h1 className="text-2xl font-bold">New Ride</h1>
      </div>
      <NewRideForm users={authRes.user} />
    </>
  );
}
