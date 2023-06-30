import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Expenseitem from "./pages/Expenseitem";
import Incomeitem from "./pages/Incomeitem";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expense" element={<Expenseitem />} />
        <Route path="/income" element={<Incomeitem />} />
      </Routes>
    </>
  );
};

export default App;
