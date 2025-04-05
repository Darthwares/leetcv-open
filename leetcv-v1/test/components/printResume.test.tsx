import PrintResume from "@components/appbar/printResume";
import SvgDragIcon from "@components/editor/svgDragIcon";
import QrCode from "@components/resume/resumeHeader/qrCode";
import Skills from "@components/skills";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("describe: print resume component", () => {
  it("Should render print resume component test results correctly", () => {
    render(
      <RecoilRoot>
        <PrintResume />
      </RecoilRoot>
    );
    const printButton = screen.getByTestId(`printButton`);
    expect(printButton).toBeInTheDocument();
    const windowPrint = screen.getByTestId(`windowPrint`);
    expect(windowPrint).toBeInTheDocument();
    const printerIcon = screen.getByTestId(`printerIcon`);
    expect(printerIcon).toBeInTheDocument();
    const print = screen.getByTestId(`print`);
    expect(print).toBeInTheDocument();
    fireEvent.click(print);
  });
});

describe("describe: SvgDragIcon component", () => {
  it("Should render SvgDragIcon component test results correctly", () => {
    render(
      <RecoilRoot>
        <SvgDragIcon />
      </RecoilRoot>
    );
    const svgDragIcon = screen.getByTestId(`svgDragIcon`);
    expect(svgDragIcon).toBeInTheDocument();
  });
});

describe("describe: QrCode component", () => {
  it("Should render QrCode component test results correctly", () => {
    render(
      <RecoilRoot>
        <QrCode />
      </RecoilRoot>
    );
    const qrCode = screen.getByTestId(`qrCode`);
    expect(qrCode).toBeInTheDocument();
  });
});

describe("describe: Skills component", () => {
  it("Should render Skills component test results correctly", () => {
    let skills = ["react"];
    render(
      <RecoilRoot>
        <Skills skills={skills} />
      </RecoilRoot>
    );
    const projectSkills = screen.getByTestId(`projectSkills`);
    expect(projectSkills).toBeInTheDocument();

    skills?.forEach((skill, id) => {
      const projectSkill = screen.getByTestId(`projectSkills-${id}`);
      expect(projectSkill).toBeInTheDocument();
    });
  });
});
