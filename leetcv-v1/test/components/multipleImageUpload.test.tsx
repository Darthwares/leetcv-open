import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import MultipleImageUploader from "@components/editor/project/multipleImageUpload";
import CarouselList from "@components/carouselList";
import ProjectImageCarousel from "@components/editor/project/projectImageCarousel";

const mockResume = {
  id: "1",
  handle: "john.doe",
  email: "john.doe@example.com",
  private: false,
  displayName: "John Doe",
  projects: [
    {
      id: "1",
      name: "Sample Project",
      skills: ["React", "JavaScript"],
      company: "Sample Company",
      title: "Sample Title",
      start: "2022-01-01",
      end: "2022-12-31",
      checked: true,
      impact: "Sample Impact",
      work: "Sample Work",
      uploadedImages: ["image1.jpg", "image2.jpg"],
      selectedImages: ["image1.jpg"],
    },
  ],
  version: "1.0",
};

const mockProject = {
  id: "1",
  name: "Sample Project",
  skills: ["React", "JavaScript"],
  company: "Sample Company",
  title: "Sample Title",
  start: "2022-01-01",
  end: "2022-12-31",
  checked: true,
  impact: "Sample Impact",
  work: "Sample Work",
  url: "https://example.com",
  uploadedImages: ["image1.jpg", "image2.jpg"],
  selectedImages: ["image1.jpg"],
};
const files = [{ fileUrl: "image1.jpg" }, { fileUrl: "image2.jpg" }];

const uniqueUploadedImages = ["image1.jpg", "image2.jpg"];

describe("MultipleImageUploader", () => {
  test("renders upload button", () => {
    render(
      <RecoilRoot>
        <MultipleImageUploader project={mockProject} />
      </RecoilRoot>
    );
    const multipleUpload = screen.getByTestId("multiple-upload");
    expect(multipleUpload).toBeInTheDocument();

    const projectImage = screen.getByTestId("projectImage");
    expect(projectImage).toBeInTheDocument();

    const hints = screen.getByTestId("hints");
    expect(hints).toBeInTheDocument();
  });

  test("calls handleProjectUploads on upload", () => {
    const handleProjectUploads = jest.fn();
    const setResume = jest.fn();
    jest.mock("recoil", () => ({
      ...jest.requireActual("recoil"),
      useRecoilState: jest.fn().mockReturnValue([mockResume, setResume]),
    }));

    render(
      <RecoilRoot>
        <MultipleImageUploader project={mockProject} />
      </RecoilRoot>
    );

    const uploadButton = screen.getByTestId("uploadImage");
    fireEvent.click(uploadButton);

    act(() => {
      handleProjectUploads(files);
    });
  });

  test("renders project image carousel component", () => {
    render(
      <RecoilRoot>
        <ProjectImageCarousel
          uniqueUploadedImages={mockProject.uploadedImages}
          project={mockProject}
        />
      </RecoilRoot>
    );

    const projectImageCarousel = screen.getByTestId("projectImageCarousel");
    expect(projectImageCarousel).toBeInTheDocument();
  });

  test("renders images and calls image  click", () => {
    const setIndex = jest.fn();
    const setIsOpen = jest.fn();
    const handleDelete = jest.fn();

    render(
      <CarouselList
        show={true}
        uniqueUploadedImages={uniqueUploadedImages}
        setIndex={setIndex}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
      />
    );

    uniqueUploadedImages.forEach((_image, id) => {
      const images = screen.getByTestId(`image-${id}`);
      expect(images).toBeInTheDocument();
      fireEvent.click(images);
    });
  });
});
