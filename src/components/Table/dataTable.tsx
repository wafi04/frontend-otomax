import { ColumnResizer } from "@/components/Table/columnResizer";
import { EditableCell } from "@/components/Table/editTable";
import { SortIcon } from "@/components/Table/sortContent";
import { HeaderDashboard } from "@/dashboard/components/headerDashboard";
import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";

export const DataTable = ({
  data,
  columns,
  title,
  subtitle,
  onUpdate, // Callback untuk handle update ke server
}: {
  data: any[];
  columns: ColumnConfig[];
  title: string;
  subtitle?: string;
  onUpdate?: (
    rowId: string | number,
    field: string,
    value: any
  ) => Promise<void>;
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [localData, setLocalData] = useState(data);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
    Object.fromEntries(columns.map((col) => [col.key, col.width]))
  );
  const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({});
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

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

  // Handle cell edit (temporary change)
  const handleCellEdit = (
    rowId: number | string,
    field: string,
    value: any
  ) => {
    const changeKey = `${rowId}-${field}`;

    // Store pending change
    setPendingChanges((prev) => ({
      ...prev,
      [changeKey]: {
        rowId,
        field,
        value,
        originalValue: localData.find((item) => item.id === rowId)?.[field],
      },
    }));

    // Update local data temporarily
    setLocalData((prev) =>
      prev.map((item) =>
        item.id === rowId ? { ...item, [field]: value } : item
      )
    );

    setEditingCell(null);
  };

  // Confirm update
  const handleConfirmUpdate = async (rowId: number | string, field: string) => {
    const changeKey = `${rowId}-${field}`;
    const pendingChange = pendingChanges[changeKey];

    if (!pendingChange || !onUpdate) return;

    setIsUpdating(changeKey);

    try {
      await onUpdate(rowId, field, pendingChange.value);

      // Remove from pending changes
      setPendingChanges((prev) => {
        const newPending = { ...prev };
        delete newPending[changeKey];
        return newPending;
      });

      // Success notification bisa ditambahkan di sini
      console.log("Update successful");
    } catch (error) {
      // Revert local data on error
      setLocalData((prev) =>
        prev.map((item) =>
          item.id === rowId
            ? { ...item, [field]: pendingChange.originalValue }
            : item
        )
      );

      // Remove from pending changes
      setPendingChanges((prev) => {
        const newPending = { ...prev };
        delete newPending[changeKey];
        return newPending;
      });

      console.error("Update failed:", error);
      // Error notification bisa ditambahkan di sini
    } finally {
      setIsUpdating(null);
    }
  };

  // Cancel update
  const handleCancelUpdate = (rowId: number | string, field: string) => {
    const changeKey = `${rowId}-${field}`;
    const pendingChange = pendingChanges[changeKey];

    if (!pendingChange) return;

    // Revert local data
    setLocalData((prev) =>
      prev.map((item) =>
        item.id === rowId
          ? { ...item, [field]: pendingChange.originalValue }
          : item
      )
    );

    // Remove from pending changes
    setPendingChanges((prev) => {
      const newPending = { ...prev };
      delete newPending[changeKey];
      return newPending;
    });
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

  // Check if cell has pending changes
  const hasPendingChange = (rowId: number | string, field: string) => {
    return `${rowId}-${field}` in pendingChanges;
  };

  return (
    <div className="w-full p-4 overflow-x-auto">
      {/* Header */}
      <HeaderDashboard description={subtitle} title={title} />

      {/* Table */}
      <table className="w-full mt-5 border text-sm border-separate border-spacing-0">
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
                  onResize={(deltaX) => handleColumnResize(column.key, deltaX)}
                />
              </th>
            ))}
            {/* Actions column */}
            <th className="px-3 py-2 text-left font-semibold text-gray-700 border-r border-gray-300 last:border-r-0 w-20">
              Actions
            </th>
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
                  className={`px-3 py-2 border-r border-gray-200 last:border-r-0 max-w-0 truncate relative ${
                    hasPendingChange(item.id, column.key)
                      ? "bg-yellow-50 border-yellow-200"
                      : ""
                  }`}
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

                  {/* Pending change indicator */}
                  {hasPendingChange(item.id, column.key) && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
                  )}
                </td>
              ))}

              {/* Actions cell */}
              <td className="px-3 py-2 border-r border-gray-200 last:border-r-0">
                <div className="flex items-center gap-1">
                  {/* Show confirm/cancel buttons if there are pending changes for this row */}
                  {columns.some((col) =>
                    hasPendingChange(item.id, col.key)
                  ) && (
                    <>
                      <button
                        onClick={() => {
                          // Confirm all pending changes for this row
                          columns.forEach((col) => {
                            if (hasPendingChange(item.id, col.key)) {
                              handleConfirmUpdate(item.id, col.key);
                            }
                          });
                        }}
                        disabled={isUpdating !== null}
                        className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors disabled:opacity-50"
                        title="Confirm updates"
                      >
                        <Check size={16} />
                      </button>

                      <button
                        onClick={() => {
                          // Cancel all pending changes for this row
                          columns.forEach((col) => {
                            if (hasPendingChange(item.id, col.key)) {
                              handleCancelUpdate(item.id, col.key);
                            }
                          });
                        }}
                        disabled={isUpdating !== null}
                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors disabled:opacity-50"
                        title="Cancel updates"
                      >
                        <X size={16} />
                      </button>
                    </>
                  )}

                  {/* Loading indicator */}
                  {isUpdating &&
                    columns.some(
                      (col) => `${item.id}-${col.key}` === isUpdating
                    ) && (
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    )}
                </div>
              </td>
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-6 py-8 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
