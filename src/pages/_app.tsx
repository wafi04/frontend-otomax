import DashboardLayout from "@/components/custom/dashboardLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  const isDashboardPage = router.pathname.startsWith('/dashboard');
  
  if (isDashboardPage) {
    return (
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    );
  }
  
  return <Component {...pageProps} />;
}