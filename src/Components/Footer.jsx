import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-10">
      <p>© {new Date().getFullYear()} FleetLink. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
