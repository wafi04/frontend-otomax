import { DataTable } from "@/components/Table/dataTable";
import { columns } from "../data/column";
import { Category, CategoryOmit } from "@/types/category";

export const TableCategory = ({ data }: { data: CategoryOmit[] }) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      title="Category Management"
      subtitle="Manage your categories with inline editing and resizable columns"
    />
  );
};
