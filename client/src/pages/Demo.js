import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const Demo = () => {
  return (
    <div>
      <h2>Decoupled CKEditor</h2>
      <CKEditor
        editor={DecoupledEditor}
        data="<p>Start typing...</p>"
        onReady={(editor) => {
          console.log("Editor is ready!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ data });
        }}
      />
    </div>
  );
};

export default Demo;
