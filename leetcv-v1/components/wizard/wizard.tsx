import WaitListHeader from "@components/waitList/waitListHeader";
import AddExperience from "@components/wizard/addExperience";
import AddSkills from "@components/wizard/addSkills";
import GetDetails from "@components/wizard/getDetails";
import { useVideoState } from "@state/state";
import { Wizard } from "react-use-wizard";
import { useRecoilState } from "recoil";

const WizardStep = () => {
  const [useThis] = useRecoilState(useVideoState);

  return (
    <div
      className="flex flex-col justify-center lg:mt-0 mt-6 items-center w-full"
      data-testid="wizard"
    >
      <div className="w-full">
        {!useThis && <WaitListHeader />}
        <div
          className={`${
            useThis ? "mt-0" : "mt-2"
          } flex flex-col max-w-7xl lg:px-1 mx-auto w-full`}
          data-testid="wizard-list"
        >
          <Wizard>
            <GetDetails />
            <AddSkills />
            <AddExperience />
          </Wizard>
        </div>
      </div>
    </div>
  );
};
export default WizardStep;
