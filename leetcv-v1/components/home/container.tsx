import clsx from "clsx";
import React from "react";

const styles: any = {
  xs: "mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-2",
  sm: "mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12",
  md: "mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-5xl lg:px-8",
  lg: "mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-7xl lg:px-8",
};

export function Container({ children, size = "sm", className, ...props }: any) {
  return (
    <div
      className={clsx(styles[size], className)}
      {...props}
      data-testid="container"
    >
      {children}
    </div>
  );
}
