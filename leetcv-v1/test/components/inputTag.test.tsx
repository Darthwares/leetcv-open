import { publicResume } from "@constants/publicResume";
import { inputTag } from "@lib/helper/inputTag";

describe("Check input Tag", () => {
  const inputList = [
    {
      type: "text",
      id: "currentUserName",
      name: "currentUserName",
      value: `a`,
      className: "hidden",
    },
    {
      type: "email",
      id: "currentUserEmail",
      name: "currentUserEmail",
      value: `b`,
      className: "hidden",
    },
    {
      type: "url",
      id: "url",
      name: "url",
      value: `b`,
      className: "hidden",
    },
    {
      type: "hidden",
      id: "email",
      name: "email",
      value: "d",
      className: "",
    },
  ];
  it("should Check and should be truthy", () => {
    const inputTest = inputTag(publicResume, "urlTest", inputList);
    expect(inputTest).toBeTruthy();
  });
});
