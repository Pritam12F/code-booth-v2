"use client";

import { useState } from "react";
import { LanguageSwitcher } from "./language-switcher";

export const EditorWrapper = () => {
  const [activeLanguage, setActiveLanguage] = useState<
    "javascript" | "html" | "css"
  >("javascript");

  return (
    <>
      <LanguageSwitcher />
    </>
  );
};
