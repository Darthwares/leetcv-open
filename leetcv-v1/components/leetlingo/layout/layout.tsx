import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex w-full">
      {/* Fixed Left Sidebar */}
      {/* <LeftSidebar /> */}

      {/* Main Content */}
      {/* <div className="flex flex-col-reverse lg:flex-row flex-1 mx-auto md:ml-56 max-w-md 2xl:max-w-3xl"> */}
      {children}

      {/* Mobile Navigation */}
      {/* <RightSidebar /> */}
      {/* </div> */}

    </div>
  );
};

export default Layout;
