import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";
import { Project } from "data/models/Project";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTranslations } from "next-intl";
import { Experience } from "data/models/Experience";
import DraftEditor from "./draftEditor";

interface RichEditorProps {
  placeholder: string;
  markdownData: Project | Experience;
  property: "work" | "impact" | "description";
}

const RichEditor = ({
  placeholder,
  markdownData,
  property,
}: RichEditorProps) => {
  const t = useTranslations("Dashboard");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const initialState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState<EditorState>(initialState);
  const [content, setContent] = useState(``);
  const [error, setError] = useState("");

  useEffect(() => {
    if (markdownData) {
      const markDown = (markdownData as any)[property];
      const rawData = markdownToDraft(markDown);
      const contentState = convertFromRaw(rawData);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
      setContent((markdownData as any)[property]);
    }
  }, [markdownData, property]);

  const handleEditorStateChange = (
    e: React.SetStateAction<EditorState | any>
  ) => {
    const currentContent = editorState.getCurrentContent().getPlainText();
    if (currentContent) {
      setError(t("required"));
    }
    setEditorState(e);
    setContent(draftToMarkdown(convertToRaw(e.getCurrentContent())));
  };

  const handleBlur = () => {
    if (userInfo) {
      if (property === "work" || property === "impact") {
        setUserInfo({
          ...userInfo,
          projects: userInfo.projects?.map((proj: Project) => {
            if (proj.id === markdownData.id) {
              return {
                ...proj,
                [property]: content,
              };
            }
            return proj;
          }),
        });
      } else if (property === "description") {
        setUserInfo({
          ...userInfo,
          experiences: userInfo.experiences?.map((exp: Experience) => {
            if (exp.id === markdownData.id) {
              return {
                ...exp,
                [property]: content,
              };
            }
            return exp;
          }),
        });
      }
    }
  };

  let className = "RichEditor-editor";
  let contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }
  return (
    <div className="texteditor border-gray-300 border p-2 inputForm rounded-md z-0 font-medium text-gray-900">
      <DraftEditor
        className={className}
        handleBlur={handleBlur}
        handleEditorStateChange={handleEditorStateChange}
        content={content}
        error={error}
        placeholder={placeholder}
        editorState={editorState}
      />
    </div>
  );
};
export default RichEditor;
