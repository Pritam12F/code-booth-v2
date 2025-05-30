import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
