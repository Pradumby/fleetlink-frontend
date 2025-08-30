import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddVehiclePage from "./pages/AddVehiclePage";
import SearchVehiclePage from "./pages/SearchVehiclePage";
import BookVehiclePage from "./pages/BookVehiclePage";
import BookingSuccess from "./pages/BookingSuccess";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const App = () => {
  const [bookData, setBookData] = useState(null);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow bg-white text-black p-6">
          <Routes>
            <Route path="/" element={<AddVehiclePage />} />
            <Route
              path="/search"
              element={<SearchVehiclePage setBookData={setBookData} />}
            />
            <Route
              path="/results"
              element={<BookVehiclePage bookData={bookData} />}
            />
            <Route path="/success" element={<BookingSuccess />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
