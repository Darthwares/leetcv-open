import React from 'react'

interface NoContentProps {
  title: string;
  description: string;
}
const NoContent = ({ title, description }: NoContentProps) => {
  return (
    <div className="relative px-4 py-2 rounded-xl shadow-lg text-sm bg-gray-100 font-medium border border-gray-300 p-2 text-gray-500  ">
      <p className="font-bold my-2 text-lg">{title}</p>
      <p>{description}</p>
      <p className="rounded-xl bg-gray-300 px-2 text-center my-4 py-2">
        Locked
      </p>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-gray-100 border-b border-r border-gray-300" />
    </div>
  );
}

export default NoContent;
