import Navbar from "@/components/custom/navbar";
import { CardInput } from "@/features/order/components/cardInput";
import Image from "next/image";

export default function Order() {
  return (
    <>
      <Navbar />
      <main className="relative bg-background">
        {/* Banner utama */}
        <div className="relative">
          <Image
            alt="Mobile Legends"
            src="https://client-cdn.bangjeff.com/veinstore.id/product/BANNER-5%20(2).jpg"
            priority
            width={1920}
            height={720}
            className="min-h-56 w-full bg-muted object-cover object-center lg:object-contain"
          />
        </div>

        {/* Header produk */}
        <section
          aria-labelledby="main-title"
          className="bg-title-product flex min-h-32 w-full items-center border-b bg-transparent lg:min-h-[160px] bg-order-header-background"
        >
          <div className="container">
            <div className="flex items-center gap-2">
              {/* Thumbnail produk */}
              <div className="flex items-start gap-4">
                <div className="product-thumbnail-container relative -top-16 md:-top-28">
                  <Image
                    alt="ML X Borg"
                    src="https://client-cdn.bangjeff.com/veinstore.id/product/mlxborgv2.webp"
                    width={300}
                    height={300}
                    className="z-20 -mb-14 aspect-square w-32 rounded-2xl object-cover shadow-2xl md:-mb-20 md:w-60"
                  />
                </div>
              </div>

              {/* Info produk */}
              <div className="py-4 sm:py-0">
                <h1
                  id="main-title"
                  className="text-xs font-bold uppercase leading-7 tracking-wider sm:text-lg"
                >
                  Mobile Legends
                </h1>
                <p className="text-xs font-medium sm:text-base/6">Moonton</p>

                {/* Badge info (desktop) */}
                <div className="mt-4 hidden gap-2 text-xs md:flex">
                  <div className="flex items-center gap-2">
                    <Image
                      alt="Proses Cepat"
                      src="https://www.veinstore.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flightning.f56faa6d.gif&w=256&q=75"
                      width={32}
                      height={32}
                      className="size-8"
                    />
                    <span className="text-xs/7 font-medium">Proses Cepat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      alt="Layanan Chat 24/7"
                      src="https://www.veinstore.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontact-support.cbc8679f.gif&w=256&q=75"
                      width={32}
                      height={32}
                      className="size-8"
                    />
                    <span className="text-xs/7 font-medium">
                      Layanan Chat 24/7
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      alt="Pembayaran Aman!"
                      src="https://www.veinstore.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecure.d47b2cba.gif&w=256&q=75"
                      width={28}
                      height={28}
                      className="ml-1.5 mr-0.5 size-5"
                    />
                    <span className="text-xs/7 font-medium">
                      Pembayaran Aman!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge info (mobile) */}
            <div className="flex w-full items-center justify-evenly gap-2 md:hidden">
              <div className="flex items-center gap-2">
                <Image
                  alt="Proses Cepat"
                  src="/_next/static/media/lightning.f56faa6d.gif"
                  width={24}
                  height={24}
                  className="size-6 md:size-8"
                />
                <span className="text-[10px] font-medium">Proses Cepat</span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  alt="Layanan Chat 24/7"
                  src="/_next/static/media/contact-support.cbc8679f.gif"
                  width={24}
                  height={24}
                  className="size-6 md:size-8"
                />
                <span className="text-[10px] font-medium">
                  Layanan Chat 24/7
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  alt="Pembayaran Aman!"
                  src="https://www.veinstore.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsecure.d47b2cba.gif&w=256&q=75"
                  width={20}
                  height={20}
                  className="ml-1 mr-0.5 size-4 md:size-8"
                />
                <span className="text-[10px] font-medium">
                  Pembayaran Aman!
                </span>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-4 lg:mt-8">
          <div className="container flex w-full flex-col gap-4 lg:hidden"></div>
        </div>
      </main>
    </>
  );
}
