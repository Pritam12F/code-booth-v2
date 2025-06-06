import { SidebarProviderWrapper } from "@/components/sidebar-providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SidebarProviderWrapper>{children}</SidebarProviderWrapper>;
}
