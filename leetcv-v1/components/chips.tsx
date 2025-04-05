import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import React, { useState } from "react";
import { Chips } from "primereact/chips";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";

const Chip = (props: any) => {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [chipItem, setChipItem] = useState(props?.preference);
  return (
    <div data-testid="chips">
      <Chips
        className="block"
        value={chipItem}
        separator=","
        data-testid="chips-input"
        onChange={(e) => {
          setChipItem(e.target.value);
          let { value } = e.target;
          let uniqueItem = [
            ...new Set(
              value.map(
                (item) => `${item.charAt(0).toUpperCase()}${item.slice(1)}`
              )
            ),
          ];
          if (userInfo) {
            setUserInfo({ ...userInfo, ["preferences"]: uniqueItem });
          }
        }}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Chip;
