import { formatDate } from "@/utils/format";
import { Edit2 } from "lucide-react";
import { Input } from "../ui/input";

export const EditableCell = ({
  item,
  field,
  value,
  column,
  isEditing,
  onEdit,
}: {
  item: any;
  field: string;
  value: any;
  column: ColumnConfig;
  isEditing: boolean;
  onEdit: (rowId: number | string, field: string, value: any) => void;
}) => {
  if (isEditing) {
    if (column.type === "boolean") {
      return (
        <select
          autoFocus
          defaultValue={value.toString()}
          onBlur={(e) => onEdit(item.id, field, e.target.value === "true")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEdit(
                item.id,
                field,
                (e.target as HTMLSelectElement).value === "true"
              );
            }
          }}
          className="w-full px-2 py-1 text-xs border-2 border-blue-500 rounded focus:outline-none"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      );
    }

    return (
      <input
        type={column.type === "number" ? "number" : "text"}
        autoFocus
        defaultValue={value}
        onBlur={(e) =>
          onEdit(
            item.id,
            field,
            column.type === "number" ? Number(e.target.value) : e.target.value
          )
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEdit(
              item.id,
              field,
              column.type === "number"
                ? Number((e.target as HTMLInputElement).value)
                : (e.target as HTMLInputElement).value
            );
          }
        }}
        className="w-full px-2 py-1 text-xs border-2 border-blue-500 rounded focus:outline-none"
      />
    );
  }

  return (
    <div
      className={`${
        column.editable
          ? "cursor-pointer hover:bg-blue-50 hover:outline hover:outline-1 hover:outline-blue-300 rounded px-1"
          : ""
      } group relative`}
    >
      {column.type === "boolean" ? (
        <span
          className={`font-medium ${value ? "text-green-600" : "text-red-600"}`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ) : column.type === "date" ? (
        <span>{formatDate(value)}</span>
      ) : (
        <span>{value}</span>
      )}
      {column.editable && (
        <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-50 absolute right-1 top-1" />
      )}
    </div>
  );
};
