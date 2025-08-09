import { AppSidebar } from "@/components/custom/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar className="border-r- border-2"/>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}