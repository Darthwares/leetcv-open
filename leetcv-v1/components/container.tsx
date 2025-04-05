import React from "react";
import { Loader } from "./loader";

export interface ContainerProps {
  children: React.ReactNode;
  loading?: boolean;
}

export default function Container(props: Readonly<ContainerProps>) {
  if (props.loading) {
    return (
      <div
        className="flex flex-col items-center justify-center pt-28"
        data-testid="loader"
      >
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="w-full mx-auto print:px-0 px-3 print:mx-0 print:max-w-full"
      data-testid="container"
      style={{ height: "calc(100vh - 0px)" }}
    >
      <div className="">
        <div
          className={`overflow-y-auto overflow-x-hidden w-full md:px-2.5 relative max-w-7xl mx-auto print:h-auto h-[100vh] top-0`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
