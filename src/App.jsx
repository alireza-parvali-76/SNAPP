import React from "react";
import Start from "./components/Start/Start";
import SwipeableEdgeDrawer from "./components/Home/Home";
import { Route,Routes,Router } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-500 ">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<SwipeableEdgeDrawer />} />
      </Routes>
    </div>
  );
}
