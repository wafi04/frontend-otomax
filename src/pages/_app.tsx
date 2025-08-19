import DashboardLayout from "@/dashboard/components/dashboardLayout";
import { ReactQueryProvider } from "@/features/providers/reactQuery";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { provideGlobalGridOptions } from "ag-grid-community";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  provideGlobalGridOptions({ theme: "legacy" });

  ModuleRegistry.registerModules([AllCommunityModule]);
  const isDashboardPage = router.pathname.startsWith("/dashboard");

  if (isDashboardPage) {
    return (
      <ReactQueryProvider>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </ReactQueryProvider>
    );
  }

  return (
    <ReactQueryProvider>
      <Component {...pageProps} />;
    </ReactQueryProvider>
  );
}
