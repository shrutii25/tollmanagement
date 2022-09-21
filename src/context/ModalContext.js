import React, { useState, createContext, useContext } from "react";

const Modal = createContext();

const ModalContext = (props) => {
  const [isTollOpen, setIsTollOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);

  const toggleTollModal = () => {
    setIsTollOpen((prev) => !prev);
  };

  const toggleVehicleModal = () => {
    setIsVehicleOpen((prev) => !prev);
  };

  return (
    <Modal.Provider
      value={{ isTollOpen, isVehicleOpen, toggleTollModal, toggleVehicleModal }}
    >
      {props.children}
    </Modal.Provider>
  );
};

export default ModalContext;

export const useModal = () => {
  return useContext(Modal);
};
