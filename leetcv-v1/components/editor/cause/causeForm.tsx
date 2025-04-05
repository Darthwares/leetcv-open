import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import { MultiSelect } from "primereact/multiselect";
import { causes } from "@constants/defaults";
import { resumeState } from "@state/state";

export default function CauseForm() {
  const t = useTranslations("Dashboard");
  const [resume, setResume] = useRecoilState(resumeState);

  return (
    <div>
      <div data-testid={`causeField`} className={`pb-5 sm:grid sm:gap-1`}>
        <div className="w-full flex-col flex justify-between md:flex-row">
          <div className="w-full md:pt-0" data-testid={`multiselect`}>
            <MultiSelect
              display="chip"
              className="flex flex-wrap md:w-full"
              optionLabel="name"
              value={resume.causes}
              placeholder={t("selectCause")}
              options={causes}
              onChange={useCallback(
                (e: any) => {
                  if (resume) {
                    setResume({
                      ...resume,
                      causes: e.value,
                    });
                  }
                },
                [resume]
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
