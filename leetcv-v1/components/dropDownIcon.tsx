import React from "react";

interface IconsProps {
  path: string;
}
const DropDownIcon = ({ path }: IconsProps) => {
  return (
    <div className="w-6">
      <img src={path} alt="dropdown-icon" className="w-full" />
    </div>
  );
};

export default DropDownIcon;
