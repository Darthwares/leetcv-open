import SocialMediaList from "@components/editor/social/socialMediaSection";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { basicState } from "../../test/testStates";
import { baseSocialMedias } from "../../test/testStates/basicState";

describe("SocialMediaList", () => {
  xit("Should render all social list", () => {
    render(
      <RecoilRoot initializeState={basicState}>
        <SocialMediaList />
      </RecoilRoot>
    );

    const socialList = screen.getByTestId("socialList");
    expect(socialList).toBeInTheDocument();

    baseSocialMedias.forEach((social, idx) => {
      expect(screen.getByTestId(`accordion-${idx}`)).toBeInTheDocument();
      expect(screen.getByTestId(`accordion-${idx}`)).not.toBeFalsy();
      expect(screen.getByTestId(`accordion-${idx}`)).toHaveTextContent(
        social.name
      );

      const socialTitle = screen.getByTestId(`social-title-${idx}`);
      expect(socialTitle).toBeInTheDocument();
      expect(socialTitle.textContent).toBe(social.name);
      fireEvent.click(socialTitle);

      const deleteIcon = screen.getByTestId(`deleteIcon-${idx}`);
      expect(deleteIcon).toBeInTheDocument();

      const deleteAction = screen.getByTestId(`deleteBtn-${idx}`);
      expect(deleteAction).toBeInTheDocument();
      expect(deleteAction.textContent).toBe("delete");
      fireEvent.click(deleteAction);
    });
  });
});
