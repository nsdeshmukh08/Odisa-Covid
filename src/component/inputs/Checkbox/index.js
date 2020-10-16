import React from 'react'


const CustomCheckbox = ({ onChange,checked,disabled,className }) => {
  return ( 
    <label className="mb-0">
      <input 
        type="checkbox"
        className={`checkbox-main--input ${className}`}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <span 
        className="checkbox-main--span"
      />
    </label>
   );
}
 
export default CustomCheckbox;