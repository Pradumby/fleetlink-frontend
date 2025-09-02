import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddVehiclePage = () => {
  const [form, setForm] = useState({ name: "", capacityKg: "", tyres: "" });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!form.name || !form.capacityKg || !form.tyres) {
      toast.error("All fields are required!");
      hasError = true;
    }

    if (hasError) return;

    try {
      await axios.post("http://localhost:4000/api/vehicles", {
        name: form.name,
        capacityKg: Number(form.capacityKg),
        tyres: Number(form.tyres),
      });
      toast.success("Vehicle added successfully!");
      setForm({ name: "", capacityKg: "", tyres: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding vehicle");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white text-black shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Vehicle</h2>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Vehicle Name"
          value={form.name}
          onChange={handleChange}
          className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          name="capacityKg"
          type="number"
          placeholder="Capacity (KG)"
          value={form.capacityKg}
          onChange={handleChange}
          className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          name="tyres"
          type="number"
          placeholder="Tyres"
          value={form.tyres}
          onChange={handleChange}
          className="border border-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          className="bg-gray-600 text-white py-2 rounded hover:bg-black transition"
        ></button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default AddVehiclePage;
