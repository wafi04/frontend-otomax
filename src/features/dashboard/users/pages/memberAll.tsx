import { HeaderDashboard } from "@/components/custom/headerdashboard";
import { userStore } from "../hooks/server";
import { useEffect } from "react";
import UsersTable from "../components/tableUsers";

export default function DashboardAllUser() {
  const { getAll, users } = userStore();
  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <main className="p-6">
        <HeaderDashboard
          title="All Members"
          description="Manage and view all users in your system."
        />
        <UsersTable users={users} />
      </main>
    </>
  );
}
