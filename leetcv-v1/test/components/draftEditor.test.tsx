import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import DraftEditor from "@components/draftEditor";
import { EditorState } from "draft-js";

describe("DraftEditor", () => {
  it("Should render all draftEditor", () => {
    const draftEditorProps = {
      handleBlur: () => {},
      className: "your-class-name",
      editorState: EditorState.createEmpty(),
      handleEditorStateChange: (newEditorState: EditorState) => {},
      placeholder: "placeholder text",
      content: "content",
      error: "error message",
    };

    render(
      <RecoilRoot>
        <DraftEditor {...draftEditorProps} />
      </RecoilRoot>
    );

    const editor = screen.getByTestId("editor");
    expect(editor).toBeInTheDocument();
  });
});
