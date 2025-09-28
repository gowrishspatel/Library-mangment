import React from "react";

export default function CustomInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  showPasswordToggle = false,
  onTogglePassword,
  style = {},
  className = "",
  ...props
}) {
  return (
    <div style={{ marginBottom: "15px", ...style }}>
      {label && <label className="input-label">{label}</label>}
      <input
        className= {className ?? "input-field"}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...props}
      />
      {showPasswordToggle && (
        <div style={{ marginTop: "5px" }}>
          <label>
            <input type="checkbox" onChange={onTogglePassword} checked={type === "text"} />
            Show Password
          </label>
        </div>
      )}
    </div>
  );
}
