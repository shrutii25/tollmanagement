import React, { useState, createContext, useContext, useEffect } from "react";

const Vehicle = createContext();

const VehicleContext = (props) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    if (Array.isArray(vehicles) && vehicles.length > 0)
      localStorage.setItem("VEHICLE_RECORD", JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    let vehicleRecord = localStorage.getItem("VEHICLE_RECORD");
    if (vehicleRecord === undefined || vehicleRecord === null) return;
    setVehicles(JSON.parse(vehicleRecord));
  }, []);

  const addVehicle = (vehicle) => {
    setVehicles((prevVehicle) => [...prevVehicle, vehicle]);
  };

  const getAllVehicles = () => vehicles;

  const searchVehicle = (vehicleNumber) => {
    return vehicles.filter((vehicle) => {
      return vehicle.number === vehicleNumber;
    });
  };

  const filterVehicle = (toll) => {
    return vehicles.filter((vehicle) => {
      return vehicle.tollName === toll;
    });
  };

  return (
    <Vehicle.Provider
      value={{ addVehicle, getAllVehicles, searchVehicle, filterVehicle }}
    >
      {props.children}
    </Vehicle.Provider>
  );
};

export default VehicleContext;

export const useVehicle = () => {
  return useContext(Vehicle);
};
