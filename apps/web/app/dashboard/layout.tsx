import { AppBar } from "@/components/appbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppBar />
      {children}
    </div>
  );
}
