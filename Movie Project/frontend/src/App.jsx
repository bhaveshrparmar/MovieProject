import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieCards from "./Pages/AllMovie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieForm from "./Pages/Form";
import Navbar from "./Pages/MovieNavbar";

export default function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieCards />} />
          <Route path="/form" element={<MovieForm />} />
          <Route path="/form/:id" element={<MovieForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
