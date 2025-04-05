import React from "react";
interface ReusableHeaderProps {
  children: React.ReactNode;
}
export default function ReusableHeader({ children }: ReusableHeaderProps) {
  return (
    <div className="rounded-lg bg-gradient-to-l from-indigo-50 to-pink-100 px-6 py-8 sm:px-10 lg:flex lg:items-center justify-between">
      {children}
    </div>
  );
}
