import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
      <Toaster />
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;
