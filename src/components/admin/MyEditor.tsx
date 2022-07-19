import React, { ComponentType, useState } from "react";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import dynamic from 'next/dynamic';
const Editor : ComponentType<EditorProps> = dynamic(
  () => import('react-draft-wysiwyg').then(({ Editor }) => Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorProps } from "react-draft-wysiwyg";

interface ITextEditorProps {
  content?: any;
  value: string;
  setFieldValue: (val: string) => void;
}

export const TextEditor = ({ content, value, setFieldValue }: ITextEditorProps) => {
  const prepareDraft = (value: string) => {
    const draft = htmlToDraft(value);
    const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  const [editorState, setEditorState] = useState(
    content ? prepareDraft(content) : value ? prepareDraft(value) : EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState: EditorState) => {
    const forFormik = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setFieldValue(forFormik);
    setEditorState(editorState);
  };
  return (
    <div className="py-2">
      <Editor
        editorState={editorState}
        wrapperClassName="custom-wrapper"
        editorClassName="custom-editor"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ['inline', 'blockType', 'list', 'emoji', 'textAlign','fontFamily', 'fontSize', 'history']
      }}
      />
    </div>
  );
};
