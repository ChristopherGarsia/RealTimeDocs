import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PlainTextEditor = () => {
  const [editorValue, setEditorValue] = useState('');

  const handleChange = (value) => {
    setEditorValue(value); // Update the state with the current editor value
  };

  const modules = {
    toolbar: false, // Disable the toolbar
  };

  const formats = [];

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={editorValue} // Bind the editor value to state
        onChange={handleChange} // Update state on change
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default PlainTextEditor;
