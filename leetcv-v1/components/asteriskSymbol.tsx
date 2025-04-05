import React from "react";

interface AsteriskSymbolProps {
  className: string;
}

const AsteriskSymbol = ({ className }: AsteriskSymbolProps) => {
  return <span className={className}>*</span>;
};

export default AsteriskSymbol;
