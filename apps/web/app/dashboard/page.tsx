"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>click me</button>
    </>
  );
}
