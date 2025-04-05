import React from "react";

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <div className="w-full lg:px-1">
      <div className="rounded-lg bg-gradient-to-r from-indigo-100 to-pink-200 px-6 py-8 sm:px-12 lg:flex lg:items-center">
        {children}
      </div>
    </div>
  );
}
