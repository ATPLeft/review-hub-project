import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Product from "./pages/Product";
import Manager from "./pages/Manager";
import Moderator from "./pages/Moderator";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Notifications from "./pages/Notifications";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { ToastProvider } from "./ToastContext";

export default function App(){
  return (
    <ToastProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Product/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/manager" element={<Manager/>}/>

        {/* 🔥 Protected Moderator Route */}
        <Route
          path="/moderator"
          element={
            localStorage.getItem("role") === "moderator"
              ? <Moderator />
              : <h2 style={{padding:"20px"}}>Access Denied</h2>
          }
        />

        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<UserDashboard/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}