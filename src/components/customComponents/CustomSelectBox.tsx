import React from "react";

interface customSelectProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: Array<Record<string, any>>;
  optionLabel?: string;
  optionValue?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function CustomSelect(props: customSelectProps) {
  const {
    label,
    value,
    onChange,
    options = [],
    optionLabel = "name",
    optionValue = "id",
    disabled = false,
    required = false,
    placeholder = "Select an option"
  } = props;
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
        {options.map((opt: any) => (
          <option key={opt[optionValue]} value={opt[optionValue]}>
            {opt[optionLabel]}
          </option>
        ))}
      </select>
    </div>
  );
}
