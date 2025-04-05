import React from "react";
import CauseForm from "./causeForm";

export default function CauseList() {
  return (
    <section id="causes" className="flex w-full gap-0">
      <div className="w-full rounded-2xl bg-white pt-2" data-testid="awardList">
        <CauseForm />
      </div>
    </section>
  );
}
