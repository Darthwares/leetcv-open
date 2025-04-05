import { colorFullSkills } from "@constants/defaults";
import { resumeFontState } from "@state/state";
import React from "react";
import { useRecoilState } from "recoil";

export interface PreferenceChipsProps {
  preference: string[] | undefined;
}
export default function PreferenceChip({ preference }: PreferenceChipsProps) {
  const [selectedFont] = useRecoilState(resumeFontState);

  return (
    <div className="flex gap-x-2 flex-wrap px-2" data-testid="preference-chip">
      {preference?.map((item, idx: number) => {
        const { border } = colorFullSkills(item);

        return (
          <p
            className={`${selectedFont.className} chip-design border border-gray-200 w-fit px-2 font-medium`}
            title={item}
            key={idx}
            style={{
              borderColor: `${border}`,
            }}
            data-testid={`preference-${idx}`}
          >
            {item}
          </p>
        );
      })}
    </div>
  );
}
