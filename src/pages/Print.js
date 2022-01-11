import React from 'react';
import highlight from 'json-format-highlight';

const jsonTheme = {
  numberColor: '#007bff',
  stringColor: '#d44950',
  trueColor: '#199891'
};

const Print = ({ data }) => (
  <pre className="p-3 bg-light">
    <code
      dangerouslySetInnerHTML={{
        __html: highlight(data, jsonTheme)
      }}
    />
  </pre>
);

export default Print;