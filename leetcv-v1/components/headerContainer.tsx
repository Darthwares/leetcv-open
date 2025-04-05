import React, { RefObject } from "react";
import HeaderDetails from "./headerDetails";
import StickyTip from "./editor/stickyTips";
import ShowStickyProgress from "./showStickyProgress";
import { RootTip } from "@constants/defaults";
interface HeaderContainerProps {
  headerRef: RefObject<HTMLDivElement>;
  isHeaderSticky: boolean;
  handleAdd: () => void;
  tipButton?: boolean;
  setTipButton?: React.Dispatch<React.SetStateAction<boolean>>;
  tipsData?: RootTip[];
  title: string;
  heading: string;
}

const HeaderContainer = ({
  headerRef,
  isHeaderSticky,
  handleAdd,
  tipButton,
  setTipButton,
  tipsData,
  title,
  heading,
}: HeaderContainerProps) => {
  return (
    <>
      <>
        <div
          ref={headerRef}
          className={`header-container ${isHeaderSticky ? "sticky" : ""}`}
        >
          <HeaderDetails
            handleAdd={handleAdd}
            setTipButton={setTipButton}
            heading={heading}
            title={title}
          />
        </div>
        {tipButton && <StickyTip stickyTips={tipsData} />}
      </>
      {isHeaderSticky && <ShowStickyProgress sticky={isHeaderSticky} />}
    </>
  );
};

export default HeaderContainer;
