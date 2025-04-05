import React from "react";

export interface LanguageChipsProps {
  languages: string[] | undefined;
}
export default function LanguageChip({ languages }: LanguageChipsProps) {
  return (
    <div className="flex space-x-2 flex-wrap" data-testid="language-chip">
      <div></div>
      {languages?.map((language, idx: number) => {
        return (
          <p
            className="text-md max-w-full p-4 px-3 py-2 rounded-lg border-2 font-light text-sm align-center capitalize my-1"
            title={language}
            key={idx}
            data-testid={`language-${idx}`}
          >
            {language}
          </p>
        );
      })}
    </div>
  );
}
