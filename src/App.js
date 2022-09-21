import * as React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Layout from "./components/Layout/Layout";
import ModalContext from "./context/ModalContext";
import TollContext from "./context/TollContext";
import VehicleContext from "./context/VehicleContext";
import TollList from "./pages/TollList/TollList";
import VehicleList from "./pages/VehicleList/VehicleList";

export default function App() {
  return (
    <TollContext>
      <ModalContext>
        <VehicleContext>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<VehicleList />} />
              <Route path="tollgates" element={<TollList />} />
            </Route>
          </Routes>
        </VehicleContext>
      </ModalContext>
    </TollContext>
  );
}
