import { DataTable } from "@/components/Table/dataTable";
import { columns } from "../data/column";
import { Category } from "@/types/category";

export const TableCategory = ({ data }: { data: Category[] }) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      title="Category Management"
      subtitle="Manage your categories with inline editing and resizable columns"
    />
  );
};
