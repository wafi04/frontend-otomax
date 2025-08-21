import { ColumnResizer } from "@/components/Table/columnResizer";
import { EditableCell } from "@/components/Table/editTable";
import { SortIcon } from "@/components/Table/sortContent";
import { HeaderDashboard } from "@/dashboard/components/headerDashboard";
import { useMemo, useState } from "react";

export const DataTable = ({
  data,
  columns,
  title,
  subtitle,
}: {
  data: any[];
  columns: ColumnConfig[];
  title: string;
  subtitle?: string;
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [localData, setLocalData] = useState(data);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
    Object.fromEntries(columns.map((col) => [col.key, col.width]))
  );

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return localData;

    return [...localData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;

      if (sortConfig.direction === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [localData, sortConfig]);

  // Handle sorting
  const handleSort = (key: string) => {
    const column = columns.find((col) => col.key === key);
    if (!column?.sortable) return;

    let direction: SortDirection = "asc";

    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig(direction ? { key, direction } : null);
  };

  // Handle cell edit
  const handleCellEdit = (
    rowId: number | string,
    field: string,
    value: any
  ) => {
    setLocalData((prev) =>
      prev.map((item) =>
        item.id === rowId ? { ...item, [field]: value } : item
      )
    );
    setEditingCell(null);
  };

  // Handle column resize
  const handleColumnResize = (columnKey: string, deltaX: number) => {
    setColumnWidths((prev) => {
      const column = columns.find((col) => col.key === columnKey);
      if (!column) return prev;

      const currentWidth = prev[columnKey];
      const newWidth = Math.max(
        column.minWidth || 60,
        Math.min(column.maxWidth || 500, currentWidth + deltaX)
      );

      return { ...prev, [columnKey]: newWidth };
    });
  };

  return (
    <div className="p-4  min-h-screen">
      {/* Header */}
      <HeaderDashboard description={subtitle} title={title} />

      {/* Table */}
      <div className="overflow-auto  border-2 mt-6" style={{ height: "500px" }}>
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 ">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: `${columnWidths[column.key]}px` }}
                  className={`px-3 py-2 text-left font-semibold text-gray-700 ${
                    column.sortable
                      ? "cursor-pointer hover:bg-gradient-to-b hover:from-gray-100 hover:to-gray-200"
                      : ""
                  } select-none border-r border-gray-300 last:border-r-0 relative`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center justify-between pr-6">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <SortIcon field={column.key} sortConfig={sortConfig} />
                    )}
                  </div>
                  <ColumnResizer
                    onResize={(deltaX) =>
                      handleColumnResize(column.key, deltaX)
                    }
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr
                key={item.id}
                className={`border-b border-gray-200 hover:bg-blue-50 ${
                  index % 2 === 0 ? "" : "bg-gray-50"
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-3 py-2 border-r border-gray-200 last:border-r-0 max-w-0 truncate"
                    style={{ width: `${columnWidths[column.key]}px` }}
                    onClick={() =>
                      column.editable &&
                      setEditingCell({ rowId: item.id, field: column.key })
                    }
                  >
                    <EditableCell
                      item={item}
                      field={column.key}
                      value={item[column.key]}
                      column={column}
                      isEditing={
                        editingCell?.rowId === item.id &&
                        editingCell?.field === column.key
                      }
                      onEdit={handleCellEdit}
                    />
                  </td>
                ))}
              </tr>
            ))}
            {sortedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
