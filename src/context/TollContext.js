import React, { useState, createContext, useContext, useEffect } from "react";

const Toll = createContext();

const TollContext = (props) => {
  const [tolls, setTolls] = useState([]);

  useEffect(() => {
    if (Array.isArray(tolls) && tolls.length > 0)
      localStorage.setItem("TOLL_RECORD", JSON.stringify(tolls));
  }, [tolls]);

  useEffect(() => {
    let tollRecord = localStorage.getItem("TOLL_RECORD");
    if (tollRecord === undefined || tollRecord === null) return;
    setTolls(JSON.parse(tollRecord));
  }, []);

  const addToll = (toll) => {
    setTolls((prev) => [...prev, toll]);
  };

  const getAllTolls = () => tolls;

  const searchToll = (tollName) => {
    return tolls.filter((toll) => {
      return toll.TollName === tollName;
    });
  };

  return (
    <Toll.Provider value={{ addToll, getAllTolls, searchToll }}>
      {props.children}
    </Toll.Provider>
  );
};

export default TollContext;

export const useToll = () => {
  return useContext(Toll);
};
