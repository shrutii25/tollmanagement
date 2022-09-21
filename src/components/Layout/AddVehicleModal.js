import { useEffect, useState } from "react";

import FormSelect from "../Form/FormSelect";
import FormInput from "../Form/FormInput";
import Modal from "../Modal/Modal";
import { vehicleTypes } from "../../config/vehicleTypes";
import { useVehicle } from "../../context/VehicleContext";
import { useToll } from "../../context/TollContext";
import { useModal } from "../../context/ModalContext";

const AddVehicleModal = ({ isVisable, hideModal }) => {
  const initNewState = {
    vehicleType: "",
    vehicleNumber: "",
    dateTime: "",
    tollName: "",
    tariff: "",
  };
  const [newVehicleData, setNewVehicleData] = useState(initNewState);
  const [error, setError] = useState(null);
  const [allTolls, setAllTolls] = useState([]);
  const [tollData, setTollData] = useState([]);
  const [noTollDataError, setNoTollDataError] = useState("");
  const { addVehicle, getAllVehicles } = useVehicle();
  const { getAllTolls } = useToll();
  const { toggleVehicleModal } = useModal();
  let tariff = 0;
  const hideModalAlt = () => {
    setNewVehicleData(initNewState);
    setError("");
    hideModal();
  }

  useEffect(() => {
    let tollData1 = getAllTolls();
    setTollData(tollData1);
    setAllTolls(tollData1.map((toll) => toll.tollName));
    if (tollData1.length > 0) {
      setNoTollDataError("");
    } else {
      setNoTollDataError("Please enter tollgate information first");
    }
  }, [getAllTolls]);

  const handleVehicleNumChange = (e) => {
    setError(null);
    setNewVehicleData((prev) => ({ ...prev, vehicleNumber: e.target.value }));
  };

  const handleVehicleTypeChange = (e) => {
    setError(null);
    setNewVehicleData((prev) => ({ ...prev, vehicleType: e.target.value }));
  };

  const handleTollChange = (e) => {
    setError(null);
    setNewVehicleData((prev) => ({ ...prev, tollName: e.target.value }));
  };

  const isWithinHour = (checkDate) => {
    var date = new Date(checkDate);
    var now = new Date();
    var diffInMS = now - date;
    var msInHour = Math.floor(diffInMS / 1000 / 60);
    if (msInHour < 60) {
      return true;
    } else {
      return false;
    }
  };

  const calcTariff = () => {
    const vehicleRecord = getAllVehicles();
    let returnJourney, singleJourney;
    let prevRecord = null;
    vehicleRecord.forEach((vehicle) => {
      if (
        vehicle.tollName === newVehicleData.tollName &&
        vehicle.vehicleType === newVehicleData.vehicleType &&
        vehicle.vehicleNumber === newVehicleData.vehicleNumber
      ) {
        prevRecord = vehicle;
      }
    });
    tollData.forEach((toll) => {
      if (newVehicleData.tollName === toll.tollName) {
        toll.prices.forEach((key) => {
          if (key.type === newVehicleData.vehicleType) {
            returnJourney = key.round;
            singleJourney = key.single;
          }
        });
      }
    });
    if (prevRecord !== null && isWithinHour(prevRecord.dateTime))
      tariff = returnJourney;
    else tariff = singleJourney;
    return tariff;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newVehicleData.vehicleNumber === "") {
      setError("Vehicle Number is required");
      return;
    }
    if (newVehicleData.vehicleType === "") {
      setError("Vehicle Type is required");
      return;
    }
    if (newVehicleData.tollName === "") {
      setError("Toll name is required");
      return;
    }
    if (error !== null) return;

    const tariff = calcTariff();
    addVehicle({
      ...newVehicleData,
      dateTime: Date.now(),
      tariff,
    });
    setError("");
    setNewVehicleData(initNewState);
    toggleVehicleModal();
  };

  return (
    <Modal isOpen={isVisable} handleClose={hideModalAlt} title={"Add new entry"}>
      <form onSubmit={handleSubmit}>
        <FormSelect
          required
          readOnly={noTollDataError !== ""}
          label={"Select toll name"}
          placeholder={"Enter toll name"}
          options={allTolls}
          value={newVehicleData.tollName}
          name="tollName"
          handleChange={handleTollChange}
        />
        {noTollDataError !== "" && (
          <p className="color-error">{noTollDataError}</p>
        )}
        <FormSelect
          required
          label={"Select vehicle type"}
          options={vehicleTypes}
          placeholder={"Enter vehicle type"}
          value={newVehicleData.vehicleType}
          name="vehicleType"
          handleChange={handleVehicleTypeChange}
        />
        <FormInput
          required
          label={"Vehicle Number"}
          placeholder={"Enter your login ID"}
          value={newVehicleData.vehicleNumber}
          name="vehicleNumber"
          handleChange={handleVehicleNumChange}
        />
        {newVehicleData.vehicleNumber !== "" &&
          newVehicleData.vehicleType !== "" &&
          newVehicleData.tollName !== "" ? (
          <p style={{ color: "rgb(18, 146, 46)" }}>
            Tariff amount is {calcTariff()}
          </p>
        ) : null}
        <p className="color-error">{error}</p>
        <button className="btn btn-primary mt">Add entry</button>
      </form>
    </Modal>
  );
};

export default AddVehicleModal;