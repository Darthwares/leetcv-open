import { resumeFontState } from "@state/state";
import React, { ReactElement } from "react";
import { useRecoilState } from "recoil";

interface ViewToggleProps {
  state: string;
  icon: ReactElement;
}

const ViewToggle = ({ state, icon }: ViewToggleProps) => {
  const [selectedFont] = useRecoilState(resumeFontState);

  return (
    <span
      data-testid="viewToggle"
      className={`${selectedFont.className} flex justify-center items-center`}
    >
      {icon} {state}
    </span>
  );
};

export default ViewToggle;
