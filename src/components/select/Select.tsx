import React, { useState } from 'react';
import style from './select.module.scss';
import { Option } from '../../types';
const { select, selectOptions, optionLanguage, selectContainer } = style;

interface selectProps {
  placeholder?: string;
  options: Option[];
  onChange: (selection: Option) => void;
  selectedValue: Option | null;
}

const Select = ({
  placeholder,
  options,
  onChange,
  selectedValue,
}: selectProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  return (
    <div className={selectContainer}>
      <div onClick={() => setShowOptions(!showOptions)} className={select}>
        <span>{selectedValue ? selectedValue.label : placeholder}</span>
        <span>v</span>
      </div>
      {showOptions && (
        <div className={selectOptions}>
          {options.map((option) => (
            <div
              onClick={() => {
                onChange(option);
                setShowOptions(false);
              }}
              key={option.value}
              className={optionLanguage}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
