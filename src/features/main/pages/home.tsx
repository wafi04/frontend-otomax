import Navbar from "@/components/custom/navbar";
import BannerHome from "../components/banner";
import { CardCategories } from "../components/popularCardCategories";
import { HeaderFilter } from "../components/headerFilter";
import { CardAllCategories } from "../components/cardAllCategories";
import { Footer } from "@/components/custom/footer";
import { useCategoryStore } from "@/features/dashboard/category/hooks/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const {
    fetchCategories,
    categories,
    pagination,
    searchTerm,
    statusFilter,
    page,
    limit,
    deleteCategory,
  } = useCategoryStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        await fetchCategories();
      } catch (error) {
        toast.error("Failed to load categories");
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, [searchTerm, statusFilter, page, limit]);

  return (
    <>
      <div className="bg-background"></div>
      {/* navbar section */}
      <Navbar />
      <main className="relative container bg-background/80 ">
        {/* banner section */}
        <BannerHome />
        {/* POPULAR */}
        {categories && <CardCategories categories={categories} />}
        {/* header filter */}
        <HeaderFilter />
        {/*  */}
        {categories && <CardAllCategories categories={categories} />}
      </main>
      <Footer />
    </>
  );
}

// container bg-background/80 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl
