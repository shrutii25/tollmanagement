import React from "react";

import "./formStyle.css";

const FormInput = ({
  label,
  placeholder,
  name,
  handleChange,
  value,
  required,
  ...props
}) => {
  return (
    <div className="form-element-wrapper" {...props}>
      <label className="form-element-label">
        {label} {required && <span className="color-error"> *</span>}
      </label>
      <input
        className="form-input"
        type="text"
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default FormInput;
