// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import Signup from "./pages/Signup";

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
      <Toaster />
      {/* <SpeedInsights /> */}
      {/* <Analytics /> */}
    </BrowserRouter>
  );
}

export default App;
