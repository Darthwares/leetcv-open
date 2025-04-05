import React from 'react'

interface IconsProps{
  path: string;
}
const Icons = ({ path }: IconsProps) => {
  return (
    <div className="w-7 -ml-1.5">
      <img src={path} alt={path} className="w-full" />
    </div>
  );
};

export default Icons;