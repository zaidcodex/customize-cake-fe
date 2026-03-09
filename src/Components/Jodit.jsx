import React, { useState, useContext, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import AppContext from '../Context/appContext';


const Jodit = ({ placeholder }) => {
  const editor = useRef(null);
  
  const context = useContext(AppContext)
  const {content, setContent} = context;

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || 'Start typings...'
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={newContent => setContent(newContent)}
    />
  );
};

export default Jodit