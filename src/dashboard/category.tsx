import { TableCategory } from "@/features/category/components/table";
import { useGetAllCategory } from "@/features/category/hooks/api";

export default function CategoryPage() {
  const { data, error, isLoading } = useGetAllCategory();
  return <>{data && <TableCategory data={data?.data || []} />};</>;
}
