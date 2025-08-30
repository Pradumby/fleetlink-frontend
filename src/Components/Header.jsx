import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/">
          <h1 className="text-2xl font-bold tracking-wide">FleetLink</h1>
        </Link>

        <nav className="space-x-6">
          <Link
            to="/"
            className="text-white text-lg font-medium hover:text-gray-300 transition-colors duration-200"
          >
            Add Vehicle
          </Link>
          <Link
            to="/search"
            className="text-white text-lg font-medium hover:text-gray-300 transition-colors duration-200"
          >
            Search & Book
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
