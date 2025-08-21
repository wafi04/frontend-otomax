import { GripVertical } from "lucide-react";
import { useCallback, useState } from "react";

export const ColumnResizer = ({
  onResize,
}: {
  onResize: (deltaX: number) => void;
}) => {
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);

      const startX = e.clientX;

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX;
        onResize(deltaX);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [onResize]
  );

  return (
    <div
      className={`absolute right-0 top-0 bottom-0 w-2 cursor-col-resize group hover:bg-blue-500 ${
        isResizing ? "bg-blue-500" : ""
      }`}
      onMouseDown={handleMouseDown}
    >
      <div className="absolute right-0.5 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="w-3 h-3 text-white" />
      </div>
    </div>
  );
};
