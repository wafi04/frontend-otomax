import Navbar from "@/components/custom/navbar";
import BannerHome from "../components/banner";
import { CardCategories } from "../components/popularCardCategories";
import { HeaderFilter } from "../components/headerFilter";
import { CardAllCategories } from "../components/cardAllCategories";
import { Footer } from "@/components/custom/footer";

export default function Home() {
  return (
    <>
      <div className="bg-background"></div>
      {/* navbar section */}
      <Navbar />
      <main className="relative container bg-background/80 ">
        {/* banner section */}
        <BannerHome />
        {/* POPULAR */}
        <CardCategories />
        {/* header filter */}
        <HeaderFilter />
        {/*  */}
        <CardAllCategories />
      </main>
      <Footer />
    </>
  );
}

// container bg-background/80 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl
