import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}

export default function CustomInput(props: CustomInputProps) {
  const {
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
    ...rest
  } = props;

  return (
    <div style={{ marginBottom: "15px", ...style }}>
      {label && <label className="input-label">{label}</label>}
      <input
        className={className ?? "input-field"}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...rest}
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
