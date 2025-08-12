import Navbar from "@/components/custom/navbar";
import { FormOrder } from "@/features/order/form/form";
import Image from "next/image";
import { Banner } from "../components/banner";
import { HeaderProuct } from "../components/headerProduk";
import { api } from "@/lib/axios";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";

export default function Order({ productData }: any) {
  console.log(productData);

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
            <HeaderProuct
              name={productData?.name || "Produk Tidak Ditemukan"}
              subName={productData?.category || ""}
            />
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
  console.log(slug);
  try {
    const req = await axios.get(`${BACKEND_URL}/products/category/${slug}`);
    console.log(req);
    return {
      props: {
        productData: req.data || null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        productData: null,
      },
    };
  }
}
