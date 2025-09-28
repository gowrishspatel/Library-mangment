import React from "react";

export default function CustomSelect({
  label,
  value,
  onChange,
  options = [],
  optionLabel = "name",
  optionValue = "id",
  disabled = false,
  required = false,
  placeholder = "Select an option"
}) {
  return (
    <div className="form">
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt[optionValue]} value={opt[optionValue]}>
            {opt[optionLabel]}
          </option>
        ))}
      </select>
    </div>
  );
}
