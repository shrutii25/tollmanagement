import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useVehicle } from "../../context/VehicleContext";
import Table from "../../components/Table";
import { useModal } from "../../context/ModalContext";
import { useToll } from "../../context/TollContext";
import Search from "../../components/Search";
import Filter from "../../components/Filter";

const VehicleList = () => {
  const [vehicleData, setVehicleData] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("Clear filter");
  const [tollForFilter, setTollForFilter] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchFilteredData, setSearchFilteredData] = useState(null);
  const [isSearchInput, setIsSearchInput] = useState(false);
  const [error, setError] = useState("");

  const { getAllVehicles, filterVehicle } = useVehicle();
  const { getAllTolls } = useToll();
  const { toggleTollModal, toggleVehicleModal } = useModal();

  useEffect(() => {
    let data = getAllVehicles();
    data = data.map((record) => ({
      ...record,
      "date Time": new Date(record.dateTime).toLocaleString(),
    }));
    setVehicleData(data);
    if (data?.length === 0) {
      setError("Currently no records found");
    } else {
      setError("");
    }
  }, [getAllVehicles]);

  useEffect(() => {
    let data = getAllTolls();
    data = data.map((d) => d.tollName);
    setTollForFilter(["Clear filter", ...data]);
  }, [getAllTolls]);

  useEffect(() => {
    let data = [];
    if (currentFilter === "Clear filter") {
      data = getAllVehicles();
    } else {
      data = filterVehicle(currentFilter);
    }
    if (data?.length === 0) {
      setError("Currently no records found")
    } else {
      setError("")
    }
    data = data.map((record) => ({
      ...record,
      dateTime: new Date(record.dateTime).toLocaleString(),
    }));
    setVehicleData([...data]);
  }, [currentFilter, filterVehicle, getAllVehicles]);

  const handleSearchChange = (e) => {
    if (e.target.value !== "") {
      setIsSearchInput(true);
      const searchData = vehicleData.filter((vehicle) =>
        vehicle.vehicleNumber
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      if (searchData.length > 0) {
        setSearchFilteredData(searchData);
        setError("");
      } else {
        setSearchFilteredData(null);
        setError("No search results found");
      }
    } else {
      setError("");
      setIsSearchInput(false);
      if (vehicleData?.length === 0) setError("Currently no records found");
      else setError("");
      setSearchFilteredData(vehicleData);
    }
  };

  return (
    <div>
      <div className="nav-container flex-container">
        <div className="filter-container flex-container">
          <h4>Toll entries/Vehicle entries</h4>
          <Filter
            isFilterOpen={isFilterOpen}
            handleFilterOpen={() => setIsFilterOpen((p) => !p)}
            tollForFilter={tollForFilter}
            setCurrentFilter={(filter) => setCurrentFilter(filter)}
            currentFilter={currentFilter}
          />
          <Search
            placeholder="Search vehicle"
            name="searchVehicle"
            handleSearchChange={handleSearchChange}
          />
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={toggleVehicleModal}>
            Add vehicle entry
          </button>
          <button className="btn btn-primary" onClick={toggleTollModal}>
            Add new toll
          </button>
          <Link to="/tollgates">
            <button className="btn btn-primary">View all tolls</button>
          </Link>
        </div>
      </div>
      {error !== "" ? (
        <p className="no-record">{error}</p>
      ) : isSearchInput ? (
        searchFilteredData &&
        searchFilteredData.length > 0 && <Table data={searchFilteredData} />
      ) : (
        vehicleData && vehicleData.length > 0 && <Table data={vehicleData} />
      )}
    </div>
  );
};

export default VehicleList;
