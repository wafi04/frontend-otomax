import { useEffect, useState } from "react";
import { useProductsStore } from "../hooks/server";
import { ServiceData } from "../hooks/types";
import { HeaderDashboard } from "@/components/custom/headerdashboard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductsTable from "../components/productsTable";
import { DialogCreateProduct } from "../components/dialog";

export default function Page() {
  const { product, isLoading, fetchAllProducts, createProduct } =
    useProductsStore();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <>
      <main className="p-6">
        <HeaderDashboard>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </HeaderDashboard>
        <ProductsTable products={product} isLoading={isLoading} />
      </main>
      {open && (
        <DialogCreateProduct open={open} onClose={() => setOpen(!open)} />
      )}
    </>
  );
}
