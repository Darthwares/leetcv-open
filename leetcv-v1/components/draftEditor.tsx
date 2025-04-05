import React from "react";
import { tooltip } from "@constants/defaults";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";

type DraftEditorProps = {
  handleBlur: () => void;
  className: string;
  editorState: EditorState;
  handleEditorStateChange: (newEditorState: EditorState) => void;
  placeholder: string;
  content: string;
  error: string;
};

const DraftEditor = ({
  handleBlur,
  className,
  editorState,
  handleEditorStateChange,
  placeholder,
  content,
  error,
}: DraftEditorProps) => {
  return (
    <div className={`px-2`} data-testid="editor">
      <div onBlur={handleBlur} className={`focus:${className}`}>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorStateChange}
          placeholder={placeholder}
          toolbar={tooltip}
          spellCheck={true}
          toolbarClassName="dark:bg-gray-800/50 dark:border-gray-700"
        />
        {!content && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default DraftEditor;
