import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const BookVehiclePage = ({ bookData }) => {
  const navigate = useNavigate();
  const { vehicles, fromPincode, toPincode, startTime } = bookData || {};

  const handleBook = async (vehicleId) => {
    try {
      await axios.post("http://localhost:4000/api/bookings", {
        vehicleId,
        fromPincode,
        toPincode,
        startTime,
        customerId: "customer123",
      });
      toast.success("Booking successful!");
      setTimeout(() => navigate("/success"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Available Vehicles
      </h2>

      {!vehicles || vehicles.length === 0 ? (
        <p className="text-center mt-10">No vehicles available</p>
      ) : (
        vehicles.map((v) => (
          <div
            key={v.vehicleId}
            className="border p-4 mb-4 rounded shadow bg-white text-black"
          >
            <p>
              <strong>Vehicle Name:</strong> {v.name}
            </p>
            <p>
              <strong>Capacity:</strong> {v.capacityKg} KG
            </p>
            <p>
              <strong>Tyres:</strong> {v.tyres}
            </p>
            <p>
              <strong>Estimated Duration:</strong>{" "}
              {v.estimatedRideDurationHours} hrs
            </p>

            <button
              onClick={() => handleBook(v.vehicleId)}
              className="bg-gray-600 text-white py-2 px-4 mt-2 rounded hover:bg-black"
            >
              Book Now
            </button>
          </div>
        ))
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default BookVehiclePage;
