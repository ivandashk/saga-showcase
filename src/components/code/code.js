import React, { useEffect } from 'react';
import Prism from 'prismjs';

import 'prismjs/themes/prism.css';

export const Code = ({ code }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div>
      <pre>
        <code className={`language-javascript`}>{code}</code>
      </pre>
    </div>
  );
}