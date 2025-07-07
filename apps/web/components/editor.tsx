"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import Editor from "@monaco-editor/react";
import { useCodeContext } from "./context/code/code-context";
import { Code, Palette, Zap } from "lucide-react";

export const EditorWrapper = () => {
  const { html, css, javascript, setHtml, setCss, setJavascript } =
    useCodeContext();

  return (
    <div className="h-full flex flex-col bg-black rounded-xl shadow-lg border overflow-hidden">
      <div className="bg-gray-900 px-6 py-4 border-b">
        <h2 className="text-white font-semibold text-lg flex items-center gap-2">
          <Code className="w-5 h-5" />
          Code Editor
        </h2>
      </div>

      <Tabs defaultValue="html" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 bg-black max-w-[400px] py-1 m-4 rounded-lg">
          <TabsTrigger
            value="html"
            className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:shadow-sm cursor-pointer"
          >
            <Code className="w-4 h-4" />
            HTML
          </TabsTrigger>
          <TabsTrigger
            value="css"
            className="flex items-center gap-2 data-[state=active]:bg-black
             data-[state=active]:shadow-sm cursor-pointer"
          >
            <Palette className="w-4 h-4" />
            CSS
          </TabsTrigger>
          <TabsTrigger
            value="javascript"
            className="flex items-center gap-2 data-[state=active]:bg-black data-[state=active]:shadow-sm cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            JavaScript
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 px-4 pb-4">
          <TabsContent value="html" className="h-full mt-0">
            <div className="h-full rounded-lg overflow-hidden border">
              <Editor
                height="100%"
                defaultLanguage="html"
                defaultValue="<!-- Start coding your HTML here -->"
                theme="vs-dark"
                onChange={(value) => setHtml(value || "")}
                value={html}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="css" className="h-full mt-0">
            <div className="h-full rounded-lg overflow-hidden border">
              <Editor
                height="100%"
                defaultLanguage="css"
                defaultValue="/* Add your styles here */"
                theme="vs-dark"
                onChange={(value) => setCss(value || "")}
                value={css}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="javascript" className="h-full mt-0">
            <div className="h-full rounded-lg overflow-hidden border">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                defaultValue="// Write your JavaScript here"
                theme="vs-dark"
                onChange={(value) => setJavascript(value || "")}
                value={javascript}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
