import { Resume } from "data/models/UserInfo";

export function inputTag(resume: Resume, url: string, items: any) {
  return [
    {
      type: "text",
      id: "currentUserName",
      name: "currentUserName",
      value: `${resume.displayName}`,
      className: "hidden",
    },
    {
      type: "email",
      id: "currentUserEmail",
      name: "currentUserEmail",
      value: `${resume.email}`,
      className: "hidden",
    },
    {
      type: "url",
      id: "url",
      name: "url",
      value: `${url}`,
      className: "hidden",
    },
    {
      type: "hidden",
      id: "email",
      name: "email",
      value: items.map((email: string) => email),
      className: "",
    },
  ];
}
