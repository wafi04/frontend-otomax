import { dataCategories } from "@/data/dummy/category";
import { TableCategory } from "@/features/category/components/table";
import { useGetAllCategory } from "@/features/category/hooks/api";

export default function CategoryPage() {
  return (
    <>{dataCategories && <TableCategory data={dataCategories || []} />};</>
  );
}
