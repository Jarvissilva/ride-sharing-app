"use client";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { newRide } from "actions/ride";

export default function NewRideForm({ users }) {
  const [state, formAction] = useFormState(newRide, {
    success: false,
    message: "",
  });
  const formRef = useRef();

  return (
    <>
      <form
        className="flex flex-col gap-4 p-5"
        ref={formRef}
        action={async (formData) => {
          await formAction(formData);
        }}
      >
        <div>
          <p>{state.message}</p>
        </div>
        <input type="hidden" name="author" value={users._id} />
        <div className="flex flex-col">
          <label htmlFor="taluka">Taluka</label>
          <select className="rounded-md border bg-white p-4" name="taluka">
            <option value="margao">Margao</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="origin">Origin</label>
          <input
            type="text"
            id="origin"
            name="origin"
            placeholder="Starting point"
            required
            className="rounded-md border p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="destination">Destination</label>
          <input
            type="text"
            id="destination"
            name="destination"
            placeholder="Ending point"
            required
            className="rounded-md border p-2"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date">Date</label>
          <input
            name="date"
            type="date"
            id="date"
            required
            className="w-full rounded-md border bg-white p-2"
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            required
            className="w-full rounded-md border bg-white p-2"
          />
        </div>

        {/* Seats Available */}
        <div className="flex flex-col">
          <label htmlFor="seats">Seats Available</label>
          <input
            type="number"
            id="seats"
            min="1"
            max="10"
            placeholder="Number of seats"
            name="seats"
            required
            className="rounded-md border p-2"
          />
        </div>

        {/* Price per Seat */}
        <div className="flex flex-col">
          <label htmlFor="vehicle">Vehicle Type</label>
          <select
            name="vehicle-type"
            className="rounded-md border bg-white p-4"
          >
            <option value="bike">Bike</option>
            <option value="car">Car</option>
          </select>
        </div>
        {/* Vehicle Information */}
        <div className="flex flex-col">
          <label htmlFor="vehicle">Vehicle Name</label>
          <input
            type="text"
            id="vehicle"
            placeholder="e.g., Sedan, Black, ABC1234"
            name="vehicle-name"
            required
            className="rounded-md border p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price">Price per Seat</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Fare per seat"
            required
            className="rounded-md border p-2"
          />
        </div>
        {/* Contact Information */}
        <div className="flex flex-col">
          <label htmlFor="contact">Contact Number</label>
          <input
            type="text"
            id="contact"
            placeholder="Optional phone or email"
            name="contact"
            className="rounded-md border p-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 rounded-md bg-blue-500 p-4 font-bold text-white"
        >
          Create Ride
        </button>
      </form>
    </>
  );
}
