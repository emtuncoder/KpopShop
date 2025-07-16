import React from "react";

export const InputComponent = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
}) => {
  return (
    <div className="w-full mb-4 pt-2">
      {label && (
        <label htmlFor={name} className=" text-sm font-medium text-foreground mb-1 flex justify-left pb-2">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200 pt-2 "
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
