import { fabSubmitButton } from "@constants/defaults";
import { getTourConfig } from "@lib/helper/tourConfig";
import React, { useEffect, useState } from "react";
import Joyride from "react-joyride";

interface OnboardingProps {
  tourConfig: {
    target: string;
    content: string;
  }[];
}

const Onboarding = ({ tourConfig }: OnboardingProps) => {
  const [endTour, setEndTour] = useState<string>("false");
  const tour = getTourConfig();

  useEffect(() => {
    tour.getTourStatus(endTour);
  }, [endTour, tour]);

  const handleCallback = (data: { action: string }) => {
    const { action } = data;
    if (action == "reset") {
      setEndTour("true");
    }
  };
  return (
    <div data-testid="reactour">
      <Joyride
        steps={tourConfig}
        run={true}
        continuous={true}
        showSkipButton={true}
        spotlightClicks={true}
        hideCloseButton={true}
        hideBackButton
        showProgress
        disableCloseOnEsc
        floaterProps={{
          title: "Tour",
          disableAnimation: true,
        }}
        callback={handleCallback}
        styles={{
          options: {
            primaryColor: fabSubmitButton,
          },
        }}
      />
    </div>
  );
};

export default Onboarding;
