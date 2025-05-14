import React from 'react';

const CustomInput = ({ icon, ...props }) => (
  <div className="mb-3 input-group">
    {icon && (
      <span className="input-group-text bg-white">
        {icon}
      </span>
    )}
    <input className="form-control" {...props} />
  </div>
);

export default CustomInput;