import { Category } from "@/types/category";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { formatDate } from "@/utils/format";

export function TableCategory({ data }: { data: Category[] }) {
  // rowData langsung dari props
  const [rowData] = useState<Category[]>(data);
  console.log(data);

  const [colDefs] = useState<ColDef<Category>[]>([
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", editable: true },
    { field: "description", headerName: "Description", editable: true },
    { field: "icon", headerName: "Icon", editable: true },
    { field: "type", headerName: "Type", editable: true },
    { field: "sort_order", headerName: "Sort Order", editable: true },
    { field: "is_active", headerName: "Active", editable: true },
    {
      field: "created_at",
      headerName: "Created At",
      valueFormatter: (params: { value: string }) => {
        console.log(params);
        if (!params.value) return "-";
        return formatDate(params.value as string);
      },
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      valueFormatter: (params: any) => {
        if (!params.value) return "-";
        return formatDate(params.value as string);
      },
    },
  ]);

  return (
    <main className="p-4">
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact<Category> rowData={rowData} columnDefs={colDefs} />
      </div>
    </main>
  );
}
