import React, { SetStateAction, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import useClickOutside from "@/hooks/use-on-click-outside";

export default function Emoji({
  setEmoji,
  setIsOpen,
  isOpen,
}: {
  setEmoji: React.Dispatch<SetStateAction<string>>;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const containerRef = useRef(null);

  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center w-full z-20"
    >
      <EmojiPicker
        theme={Theme.DARK}
        onEmojiClick={(data) => {
          setEmoji(data.emoji);
        }}
        width={375}
      />
    </div>
  );
}
