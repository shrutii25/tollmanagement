import React from "react";

import "./formStyle.css";

const FormSelect = ({
  label,
  options,
  value,
  handleChange,
  name,
  readOnly,
  required,
  defaultValue,
  placeholder,
  ...props
}) => {
  return (
    <div className="form-element-wrapper" {...props}>
      <label className="form-element-label">
        {label} {required && <span className="color-error"> *</span>}
      </label>
      <select
        defaultValue={defaultValue}
        disabled={readOnly}
        className={`form-select ${value === "" && "option-disable"}`}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option value="" disabled selected hidden>{placeholder}</option>
        {options?.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
