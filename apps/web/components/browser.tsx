"use client";

import { useEffect, useRef } from "react";
import { useCodeContext } from "./context/code/code-context";
import { Monitor, RefreshCw } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export const Browser = () => {
  const { html, css, javascript } = useCodeContext();
  const iFrameRef = useRef<HTMLIFrameElement>(null);

  const refreshPreview = () => {
    updateIframe();
  };

  const updateIframe = () => {
    const document = iFrameRef.current?.contentDocument;

    if (document) {
      const fullDoc = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview</title>
            <style>
              body {
                margin: 0;
                padding: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              ${css}
            </style>
          </head>
          <body>
            ${html}
            <script>
              try {
                ${javascript}
              } catch (error) {
                console.error('JavaScript Error:', error);
              }
            <\/script>
          </body>
        </html>
      `;

      document.open();
      document.write(fullDoc);
      document.close();
    }
  };

  useEffect(() => {
    updateIframe();
  }, [html, css, javascript]);

  return (
    <div className="h-full flex flex-col bg-white rounded-md shadow-lg border overflow-hidden">
      <div className="bg-gray-900 px-6 py-4 border-b flex items-center justify-between">
        <h2 className="text-white font-semibold text-lg flex items-center gap-2">
          <Monitor className="w-5 h-5" />
          Live Preview
        </h2>
        <Button
          onClick={refreshPreview}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-slate-700"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 p-4">
        <div className="h-full rounded-lg overflow-hidden border bg-white shadow-inner">
          <iframe
            ref={iFrameRef}
            className="w-full h-full border-0"
            title="Code Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};
