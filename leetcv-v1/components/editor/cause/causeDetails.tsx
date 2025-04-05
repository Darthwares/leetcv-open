import React from "react";
import CauseDetailsHeader from "./causeDetailsHeader";
import CauseList from "./causeList";

export default function CauseDetails() {
  return (
    <div data-testid="causeDetails" id="causes">
      <CauseDetailsHeader />
      <CauseList />
    </div>
  );
}
