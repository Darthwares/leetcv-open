import React from "react";

export interface DescListProps {
  children: React.ReactNode;
}

export default function DescList(props: DescListProps) {
  return (
    <div className="border-gray-200" data-testid="descList">
      <dl>{props.children}</dl>
    </div>
  );
}
