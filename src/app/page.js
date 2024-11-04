import {
  FaCar,
  FaDollarSign,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaStar,
} from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import Link from "next/link";
import { getLoggedUser } from "actions/auth";
import { redirect } from "next/navigation";
import { getRides } from "actions/ride";

export default async function Home() {
  const authRes = await getLoggedUser();
  console.log(authRes);
  if (!authRes.success) redirect("/login");

  const rides = await getRides();

  console.log(rides);

  return (
    <>
      <main className="px-5 pb-4">
        <div className="flex items-center justify-between py-4">
          <select className="bg-white text-xl font-bold">
            <option>Select Location</option>
            <option>Mormugao</option>
            <option>Verna</option>
            <option>Margao</option>
            <option>Bambolim</option>
            <option>Taleigao</option>
            <option>Panjim</option>
            <option>Ponda</option>
          </select>
          <Link
            href="/rides/new"
            className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-white"
          >
            Post Ride
          </Link>
        </div>
        <div className="space-y-4">
          {rides.rides.length > 0 ? (
            rides.rides.map((ride, index) => (
              <RideCard key={index} ride={ride} />
            ))
          ) : (
            <p>Rides not found</p>
          )}
        </div>
      </main>
    </>
  );
}

const RideCard = ({ ride }) => {
  const formattedDate = new Date(ride.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <div className="flex flex-col gap-5 rounded-md border bg-white p-5 shadow-lg">
        <div className="flex items-center justify-start gap-2">
          <FiMapPin size={20} />

          <h2>{ride.origin}</h2>
        </div>
        <div className="flex items-center justify-start gap-2">
          <FaMapMarkerAlt size={20} />
          <h2>{ride.destination}</h2>
        </div>
        <div className="flex">
          <div className="flex items-center justify-between gap-2">
            <FaUser />
            {ride.author.name}
          </div>
        </div>
        <div className="flex items-center justify-start gap-2">
          <IoTimeOutline size={20} />
          <h2>
            {formattedDate}
            {ride.time}
          </h2>
        </div>
        <div className="flex items-center justify-start gap-2">
          <FaRupeeSign size={20} />
          <h2>{ride.price}</h2>
        </div>
        <div className="flex items-center justify-start gap-2">
          <FaCar size={20} />
          <h2>{ride.seats} seats</h2>
        </div>
        <div className="w-full text-center">
          <Link
            href={`tel:+${ride.contact}`}
            className="block w-full rounded-md bg-blue-500 px-4 py-2 font-bold text-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};
