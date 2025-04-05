import React from "react";

export interface ReusableFeed {
  children: React.ReactNode;
  title?: string;
}

const ReusableFeed = (props: ReusableFeed) => {
  return (
    <div className="px-2 lg:px-5 my-6 space-y-1.5 w-full">
      <p className="font-semibold text-2xl">{props.title}</p>
      <div>{props.children}</div>
    </div>
  );
};

export default ReusableFeed;
