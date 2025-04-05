import { TrashIcon } from '@heroicons/react/outline';
import React from 'react'

interface TrashButtonProps {
  onClick: () => void;
}
const TrashButton = ({ onClick }: TrashButtonProps) => {
  return (
    <button
      type="button"
      className="border bg-red-600 border-red-700 hover:bg-red-700 text-white focus:outline-none font-medium rounded-full text-sm p-2 text-center inline-flex items-center"
      onClick={onClick}
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  );
};

export default TrashButton