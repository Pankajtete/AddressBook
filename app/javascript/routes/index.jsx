import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import AddContact from "../components/AddContact";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addbooks/create" element={<AddContact />} />
    </Routes>
  </Router>
);