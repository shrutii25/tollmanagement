import { useState } from "react";

import FormInput from "../Form/FormInput";
import FormSelect from "../Form/FormSelect";
import Modal from "../Modal/Modal";
import { vehicleTypes } from "../../config/vehicleTypes";
import { useToll } from "../../context/TollContext";
import { useModal } from "../../context/ModalContext";

const AddTollModal = ({ isVisable, hideModal }) => {
  const prices = vehicleTypes.reduce((acc, curr) => {
    return [
      ...acc,
      {
        type: curr,
        single: "",
        round: "",
      },
    ];
  }, []);
  const initNewState = {
    tollName: "",
    prices,
  };
  const [newTollData, setNewTollData] = useState(initNewState);
  const [error, setError] = useState(null);
  const { addToll } = useToll();
  const { toggleTollModal } = useModal();

  console.log({ initNewState })
  const hideModalAlt = () => {
    setNewTollData(initNewState);
    setError("");
    hideModal();
  }

  const handleNameChange = (e) => {
    setError(null);
    setNewTollData((prev) => ({ ...prev, tollName: e.target.value }));
  };

  const handlePriceChange = (e, key) => {
    setError(null);
    setNewTollData((prev) => {
      const newPrices = [...prev.prices];
      newPrices[key][e.target.name] = e.target.value;
      return { ...prev, prices: newPrices };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTollData.tollName === "") {
      setError("Name is required");
      return;
    }
    newTollData.prices.forEach((price) => {
      if (price.single === "" || price.round === "") {
        setError("Prices are required");
      }
    });
    if (error !== null) return;
    addToll(newTollData);
    setError("");
    setNewTollData(initNewState);
    toggleTollModal();
  };

  return (
    <Modal isOpen={isVisable} handleClose={hideModalAlt} title={"Add new toll"}>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          label="Toll Name"
          placeholder="Enter toll name"
          value={newTollData.tollName}
          name="tollName"
          handleChange={handleNameChange}
        />
        <p style={{ marginTop: "1rem" }}>
          Vehicle fare details
          <span className="color-error">
            {" "} *
          </span>
        </p>
        {vehicleTypes.map((type, index) => (
          <div key={type} className="flex justify-between">
            <FormSelect
              readOnly
              defaultValue={type}
              options={[type]}
              label="Vehicle type"
              style={{ marginRight: "0.75rem" }}
            />
            <FormInput
              name={"single"}
              handleChange={(e) => handlePriceChange(e, index)}
              label="Single Journey"
              placeholder={"Enter Price"}
              value={newTollData.prices[index].single}
              style={{ marginRight: "0.75rem" }}
            />
            <FormInput
              name={"round"}
              handleChange={(e) => handlePriceChange(e, index)}
              label="Return Journey"
              placeholder={"Enter Price"}
              value={newTollData.prices[index].round}
            />
          </div>
        ))}
        <p className="color-error">{error}</p>
        <button type="submit" className="btn btn-primary mt">
          Add details
        </button>
      </form>
    </Modal>
  );
};

export default AddTollModal;
