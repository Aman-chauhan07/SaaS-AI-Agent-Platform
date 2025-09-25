import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "../module/dashboard/ui/components/dashboard-sidebar";
import { DashboardNavbar } from "../module/dashboard/ui/components/dashboard-navbar";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
}

export default Layout;
