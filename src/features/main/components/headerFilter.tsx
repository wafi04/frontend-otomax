import { useState } from "react";

export function HeaderFilter() {
  const categories = [
    "Top Up Games",
    "Game Baru",
    "Specialist Mobile Legends",
    "Klan X VEIN",
    "Voucher",
    "Pulsa & PLN",
    "Hiburan",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="hide-scrollbar mt-5 -mb-px flex transform items-center gap-2 overflow-auto duration-300 ease-in-out md:gap-3">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold outline-none duration-300
            ${
              activeIndex === index
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          role="tab"
          type="button"
          aria-selected={activeIndex === index}
          tabIndex={0}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
