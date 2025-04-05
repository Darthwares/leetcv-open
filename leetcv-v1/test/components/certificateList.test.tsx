import CertificateList from "@components/editor/certificate/certificateSection";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { basicState } from "../../test/testStates";
import { baseCertifications } from "../../test/testStates/basicState";

describe("CertificateList", () => {
  xit("Should render all certificate list", () => {
    render(
      <RecoilRoot initializeState={basicState}>
        <CertificateList />
      </RecoilRoot>
    );

    const certificateList = screen.getByTestId("certificateList");
    expect(certificateList).toBeInTheDocument();

    baseCertifications.forEach((certificate, idx) => {
      expect(screen.getByTestId(`accordion-${idx}`)).toBeInTheDocument();
      expect(screen.getByTestId(`accordion-${idx}`)).not.toBeFalsy();
      expect(screen.getByTestId(`accordion-${idx}`)).toHaveTextContent(
        certificate.name
      );

      const certificateTitle = screen.getByTestId(`certificate-title-${idx}`);
      expect(certificateTitle).toBeInTheDocument();
      expect(certificateTitle.textContent).toBe(certificate.name);
      fireEvent.click(certificateTitle);

      const deleteIcon = screen.getByTestId(`deleteIcon-${idx}`);
      expect(deleteIcon).toBeInTheDocument();

      const deleteAction = screen.getByTestId(`deleteBtn-${idx}`);
      expect(deleteAction).toBeInTheDocument();
      expect(deleteAction.textContent).toBe("delete");
      fireEvent.click(deleteAction);
    });
  });
});
