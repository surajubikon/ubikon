import React, { useState, useEffect } from "react";
import Select from "react-select";

const MultiSelectDropdown = ({ options, label, onChange, totalAmount }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const getUpdatedOptions = () => {
    return options.map((milestone) => {
      const percentage = parseInt(milestone.label.match(/\d+/)[0]); 
      const calculatedAmount = ((totalAmount * percentage) / 100).toFixed(2);
      return {
        value: milestone.value,
        label: `${milestone.label.split("...")[0]} (${percentage}% - ${calculatedAmount})`,
      };
    });
  };

  useEffect(() => {
    const updatedOptions = getUpdatedOptions();

    const updatedSelectedOptions = selectedOptions.map((selected) => {
      return updatedOptions.find((option) => option.value === selected.value) || selected;
    });

    setSelectedOptions(updatedSelectedOptions);
  }, [totalAmount]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
    onChange(selected);
  };

  return (
    <div className="w-72 mx-auto mt-4">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <Select
        isMulti
        options={getUpdatedOptions()}
        value={selectedOptions}
        onChange={handleChange}
        className="mt-2"
      />
    </div>
  );
};

export default MultiSelectDropdown;
