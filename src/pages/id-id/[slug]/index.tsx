import Navbar from "@/components/custom/navbar";
import { FormOrder } from "@/features/order/form/form";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";
import { Banner } from "@/features/order/components/banner";
import { HeaderProuct } from "@/features/order/components/headerProduk";
import { ProductDataCard } from "@/features/order/components/productCard";
import { MethodSection } from "@/features/order/components/method";
import { ProductToSell } from "@/types/productPrice";

export default function Order({
  productData,
}: {
  productData: ProductToSell[];
}) {
  return (
    <>
      <Navbar />
      <main className="relative bg-background">
        <Banner />
        <section
          aria-labelledby="main-title"
          className="bg-title-product flex min-h-32 w-full items-center border-b bg-transparent lg:min-h-[160px] bg-order-header-background"
        >
          <div className="container">
            {productData && (
              <HeaderProuct
                name={productData[0]?.categoryName || "Produk Tidak Ditemukan"}
                subName={productData[0]?.categorySubName || ""}
              />
            )}
          </div>
        </section>
        <div className="mt-4 lg:mt-8">
          <div className="mt-0 lg:block">
            <form
              action=""
              className="container relative mt-4 grid grid-cols-3 gap-4 md:gap-8 lg:mt-8"
            >
              <div className="col-span-3 col-start-1 flex flex-col gap-4 lg:col-span-2 lg:gap-8">
                <FormOrder />
                <ProductDataCard productData={productData} />
                <MethodSection />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

// SSR function
export async function getServerSideProps(context: any) {
  const { slug } = context.params;
  try {
    const req = await axios.get(`${BACKEND_URL}/products/category/${slug}`);
    return {
      props: {
        productData: req.data.data || null,
      },
    };
  } catch (error) {
    return {
      props: {
        productData: null,
      },
    };
  }
}
