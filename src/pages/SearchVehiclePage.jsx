import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchVehiclePage = ({ setBookData }) => {
  const [form, setForm] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSearch = async () => {
    if (
      !form.capacityRequired ||
      !form.fromPincode ||
      !form.toPincode ||
      !form.startTime
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:4000/api/vehicles/available",
        {
          params: {
            capacityRequired: Number(form.capacityRequired),
            fromPincode: form.fromPincode,
            toPincode: form.toPincode,
            startTime: new Date(form.startTime).toISOString(),
          },
        }
      );

      if (res.data.length === 0) {
        toast.info("No vehicles available");
        return;
      }

      setBookData({
        vehicles: res.data,
        fromPincode: form.fromPincode,
        toPincode: form.toPincode,
        startTime: form.startTime,
      });

      navigate("/results");
    } catch (err) {
      toast.error("Error fetching vehicles");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white text-black shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Search Vehicle</h2>
      <div className="flex flex-col space-y-4 mb-6">
        <input
          type="number"
          name="capacityRequired"
          placeholder="Capacity Required"
          value={form.capacityRequired}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="fromPincode"
          placeholder="From Pincode"
          value={form.fromPincode}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="toPincode"
          placeholder="To Pincode"
          value={form.toPincode}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-600 text-white py-2 rounded hover:bg-black"
        >
          Search Availability
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default SearchVehiclePage;
