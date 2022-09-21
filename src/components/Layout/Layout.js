import React from "react";
import { Outlet } from "react-router-dom";

import "./layout.css";

import AddVehicleModal from "./AddVehicleModal";
import AddTollModal from "./AddTollModal";
import { useModal } from "../../context/ModalContext";

const Layout = () => {
  const { isTollOpen, isVehicleOpen, toggleTollModal, toggleVehicleModal } =
    useModal();

  return (
    <div>
      <div className="header">
        <div className="container">
          <h1 className="heading">Toll Management Application</h1>
        </div>
      </div>
      <div className="container">
        <Outlet />
      </div>
      <AddVehicleModal
        isVisable={isVehicleOpen}
        hideModal={toggleVehicleModal}
      />
      <AddTollModal isVisable={isTollOpen} hideModal={toggleTollModal} />
    </div>
  );
};

export default Layout;
