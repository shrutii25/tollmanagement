import React, { useEffect, useRef } from 'react'
import { FaFilter } from "react-icons/fa";

import "./style.css";

const Filter = ({ isFilterOpen, handleFilterOpen, tollForFilter, setCurrentFilter, currentFilter }) => {
  const ref = useRef();

  useEffect(() => {
    const filterCheck = (e) => {
      if (!ref.current.contains(e.target) && isFilterOpen) {
        handleFilterOpen();
      }
    }
    document.addEventListener('click', filterCheck);
    return () => {
      document.removeEventListener('click', filterCheck);
    }
  }, [handleFilterOpen, isFilterOpen]);

  return (
    <div className="filter-wrapper" ref={ref}>
      <button className="btn" onClick={handleFilterOpen}>
        <FaFilter size="1rem" />
      </button>
      {isFilterOpen && (
        <div className="filter">
          {tollForFilter?.map((toll) => (
            <div
              key={toll}
              onClick={() => {
                setCurrentFilter(toll);
                handleFilterOpen();
              }}
              className={`filter-item ${toll === currentFilter ? "selected-filter" : ""
                }`}
            >
              {toll}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Filter