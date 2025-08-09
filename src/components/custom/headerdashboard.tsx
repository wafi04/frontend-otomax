import { usePathname, useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { ReactNode } from "react";

export function HeaderDashboard({
    title = "Dashboard",
    description = "Welcome to your admin dashboard. Monitor your business metrics and manage your operations.",
    children
}  : {
    title? : string
    description? : string
    children? : ReactNode
}) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DynamicBreadcrumb />
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between ">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                <p className="text-muted-foreground">
                {description}
                </p>
              </div>
             {children}
            </div>
      </div>
    </>
  );
}

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Parse path segments
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;

    // Convert segment to readable format
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      label,
      href,
      isLast,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home/Root item */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className="flex items-center gap-2">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
