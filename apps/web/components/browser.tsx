"use client";

import { useEffect, useRef } from "react";
import { useCodeContext } from "./context/code/code-context";

export const Browser = () => {
  const { html, css, javascript } = useCodeContext();
  const iFrameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const document = iFrameRef.current?.contentDocument;

    if (document) {
      const fullDoc = `
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>
              ${javascript}
            <\/script>
          </body>
        </html>
      `;

      document.open();
      document.write(fullDoc);
      document.close();
    }
  }, [html, css, javascript]);

  return (
    <>
      <iframe
        ref={iFrameRef}
        className="flex-1 h-[656px] bg-white mr-4 mt-21.5 mb-7.5"
      />
    </>
  );
};
