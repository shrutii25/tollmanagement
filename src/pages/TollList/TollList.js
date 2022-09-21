import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useModal } from "../../context/ModalContext";
import { useToll } from "../../context/TollContext";
import Table from "../../components/Table";
import Search from "../../components/Search";

const TollList = () => {
  const [tollData, setTollData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [isSearchInput, setIsSearchInput] = useState(false);
  const [error, setError] = useState("");
  const { toggleTollModal, toggleVehicleModal } = useModal();
  const { getAllTolls } = useToll();

  useEffect(() => {
    const data = getAllTolls();
    const newData = data.map((toll) => {
      const prices = toll.prices.reduce((newPrices, curr) => {
        return { ...newPrices, [curr.type]: `${curr.single}/${curr.round}` };
      }, {});
      return {
        tollName: toll.tollName,
        ...prices,
      };
    });
    setTollData(newData);
    if (newData?.length === 0) {
      setError("Currently no records found");
    } else {
      setError("");
    }
  }, [getAllTolls]);

  const handleSearchChange = (e) => {
    if (e.target.value !== "") {
      setIsSearchInput(true);
      const searchData = tollData.filter((toll) =>
        toll.tollName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (searchData.length) {
        setFilteredData(searchData);
        setError("");
      } else {
        setFilteredData(null);
        setError("No search results found");
      }
    } else {
      setError("");
      setIsSearchInput(false);
      if (tollData?.length === 0) setError("Currently no records found");
      else setError("");

      setFilteredData(tollData);
    }
  };

  return (
    <div>
      <div className="nav-container flex-container">
        <div className="filter-container flex-container">
          <h4>Tollgate List</h4>
          <Search
            placeholder="Search a toll"
            name="searchToll"
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
          <Link to="/">
            <button className="btn btn-primary">Back to vehicle logs</button>
          </Link>
        </div>
      </div>
      {error !== "" ? (
        <p className="no-record">{error}</p>
      ) : isSearchInput ? (
        filteredData && filteredData.length > 0 && <Table data={filteredData} />
      ) : (
        tollData && tollData.length > 0 && <Table data={tollData} />
      )}
    </div>
  );
};

export default TollList;
