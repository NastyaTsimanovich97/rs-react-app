import React from 'react';

interface ICheckboxProps {
  isChecked: boolean;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    isChecked: boolean
  ) => void;
}

export function Checkbox({ isChecked, handleChange }: ICheckboxProps) {
  return (
    <div className="checkbox-container">
      <input
        checked={isChecked}
        onChange={(event) => handleChange(event, isChecked)}
        type="checkbox"
      />
    </div>
  );
}
