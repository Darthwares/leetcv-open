import React from "react";

interface ShowStatusProps{
    status: string
}
const ShowStatus = ({ status }: ShowStatusProps) => {
  return (
    <>
      {status === "active" && (
        <p className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/10 capitalize">
          {status}
        </p>
      )}
      {status === "pending" && (
        <p className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset text-yellow-700 bg-yellow-50 ring-yellow-600/10 capitalize">
          {status}
        </p>
      )}
      {status === "delisted" && (
        <p className="inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/10 capitalize">
          {status}
        </p>
      )}
    </>
  );
};

export default ShowStatus;
