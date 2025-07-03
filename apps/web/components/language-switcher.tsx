import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import Editor from "@monaco-editor/react";
import { useState } from "react";

export const LanguageSwitcher = () => {
  const [htmlCode, setHtmlCode] = useState<undefined | string>("");
  const [cssCode, setCssCode] = useState<undefined | string>("");
  const [jsCode, setJsCode] = useState<undefined | string>("");

  return (
    <Tabs defaultValue="account" className="w-[45vw]">
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
            setHtmlCode(e);
          }}
          value={htmlCode}
        />
      </TabsContent>
      <TabsContent value="css" className="ml-5 pb-7">
        <Editor
          height="90vh"
          width="42vw"
          defaultLanguage="css"
          defaultValue="// some comment"
          theme="vs-dark"
          onChange={(e) => {
            setCssCode(e);
          }}
          value={cssCode}
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
            setJsCode(e);
          }}
          value={jsCode}
        />
      </TabsContent>
    </Tabs>
  );
};
