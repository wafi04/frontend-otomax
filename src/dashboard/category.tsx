import { dataCategories } from "@/data/dummy/category";
import { TableCategory } from "@/features/category/components/table";

export default function CategoryPage() {
  return (
    <>{dataCategories && <TableCategory data={dataCategories || []} />};</>
  );
}
