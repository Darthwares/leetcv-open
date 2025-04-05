import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { useRecoilState, useSetRecoilState } from "recoil";
import { coverLetterState, sideBarOpenState } from "@state/state";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTranslations } from "next-intl";
import DraftEditor from "@components/draftEditor";

interface CoverLetterEditorProps {
  placeholder: string;
  markdownData: string;
}

const CoverLetterEditor = ({
  placeholder,
  markdownData,
}: CoverLetterEditorProps) => {
  const t = useTranslations("Dashboard");
  const initialState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState<EditorState>(initialState);
  const [content, setContent] = useState(``);
  const [error, setError] = useState("");
  const setCoverLetter = useSetRecoilState(coverLetterState);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  useEffect(() => {
    if (markdownData) {
      const rawData = markdownToDraft(markdownData);
      const contentState = convertFromRaw(rawData);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
      setContent(markdownData);
      setCoverLetter(markdownData);
    }
  }, [markdownData]);

  const handleEditorStateChange = (newEditorState: EditorState) => {
    const currentContent = newEditorState.getCurrentContent();
    if (!currentContent.hasText()) {
      setError(t("required"));
    }
    setEditorState(newEditorState);
    const newContent = draftToMarkdown(
      convertToRaw(newEditorState.getCurrentContent())
    );
    setContent(newContent);
  };

  const handleBlur = () => {
    if (content) {
      setCoverLetter(content);
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
    <div
      className={`texteditor border-gray-300 dark:border-gray-700 dark:bg-gray-900 print:bg-white dark:text-gray-100 border p-2 
      rounded-md z-0 font-medium text-gray-900 min-w-full lg:min-w-[32rem] xl:min-w-[38rem] lg:max-w-4xl xl:max-w-4xl min-h-[70vh] lg:min-h-[60vh]`}
      data-testid="coverLetterEditor"
    >
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
export default CoverLetterEditor;
