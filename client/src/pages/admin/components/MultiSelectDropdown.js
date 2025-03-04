import React, { useState } from "react";
import Select from "react-select";

const MultiSelectDropdown = ({ options, label, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
    onChange(selected); // Pass selected values to parent component
  };

  return (
    <div className="w-72 mx-auto mt-4">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        className="mt-2"
      />
    </div>
  );
};

export default MultiSelectDropdown;
