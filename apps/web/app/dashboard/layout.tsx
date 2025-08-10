import { AppBar } from "@/components/appbar";
import Sidebar from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black">
      <AppBar />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
