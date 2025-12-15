import React from "react";
import SwipeableEdgeDrawer from "./components/Home/Home";
import { Route,Routes,Router } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-500 ">
      <SwipeableEdgeDrawer />
    </div>
  );
}
