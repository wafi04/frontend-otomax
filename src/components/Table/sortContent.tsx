import { ChevronDown, ChevronUp } from "lucide-react";

export const SortIcon = ({
  field,
  sortConfig,
}: {
  field: string;
  sortConfig: SortConfig | null;
}) => {
  if (!sortConfig || sortConfig.key !== field) {
    return <ChevronUp className="w-3 h-3 opacity-30" />;
  }

  return sortConfig.direction === "asc" ? (
    <ChevronUp className="w-3 h-3 text-blue-600" />
  ) : (
    <ChevronDown className="w-3 h-3 text-blue-600" />
  );
};
