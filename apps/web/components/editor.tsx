"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import Editor from "@monaco-editor/react";
import { useCodeContext } from "./context/code/code-context";
import { useSidebarOpenContext } from "./context/sidebar/sidebar-context";

export const EditorWrapper = () => {
  const { html, css, javascript, setHtml, setCss, setJavascript } =
    useCodeContext();

  const { isOpen } = useSidebarOpenContext();

  return (
    <Tabs defaultValue="html" className={`w-[45%]`}>
      <TabsList className="mx-auto my-5">
        <TabsTrigger value="html" className="cursor-pointer">
          HTML
        </TabsTrigger>
        <TabsTrigger value="css" className="cursor-pointer">
          CSS
        </TabsTrigger>
        <TabsTrigger value="javascript" className="cursor-pointer">
          Javascript
        </TabsTrigger>
      </TabsList>
      <TabsContent value="html" className="ml-5 pb-7">
        <Editor
          height="90vh"
          width="42vw"
          defaultLanguage="html"
          defaultValue=""
          theme="vs-dark"
          onChange={(e) => {
            setHtml(e);
          }}
          value={html}
        />
      </TabsContent>
      <TabsContent value="css" className="ml-5 pb-7">
        <Editor
          height="90vh"
          width="42vw"
          defaultLanguage="css"
          defaultValue=""
          theme="vs-dark"
          onChange={(e) => {
            setCss(e);
          }}
          value={css}
        />
      </TabsContent>
      <TabsContent value="javascript" className="ml-5 pb-7">
        <Editor
          height="90vh"
          width="42vw"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          theme="vs-dark"
          onChange={(e) => {
            setJavascript(e);
          }}
          value={javascript}
        />
      </TabsContent>
    </Tabs>
  );
};
