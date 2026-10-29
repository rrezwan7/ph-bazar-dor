import type { Product } from "@/lib/api";

type PriceTickerProps = {
  products: Product[];
};

export default function PriceTicker({ products }: PriceTickerProps) {
  const updatedProducts = products.filter(
    (product) => product.change.pct !== 0
  );

  return (
    <section
      aria-label="বাজারদরের সর্বশেষ পরিবর্তন"
      className="border-b border-gray-200 bg-[#F0F5F0]"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <span className="shrink-0 rounded-md bg-[#05893E] px-3 py-2 text-sm font-semibold text-white">
          বাজার আপডেট
        </span>

        <div className="flex min-w-0 gap-6 overflow-x-auto py-1">
          {updatedProducts.map((product) => (
            <div
              key={product.id}
              className="flex shrink-0 items-center gap-2 text-sm"
            >
              <span className="font-medium text-[#1D271F]">
                {product.nameBn}
              </span>

              <span className="text-gray-600">
                ৳{product.today}/{product.unit}
              </span>

              <span
                className={
                  product.change.dir === "up"
                    ? "font-semibold text-red-600"
                    : "font-semibold text-green-700"
                }
              >
                {product.change.dir === "up" ? "↑" : "↓"}{" "}
                {Math.abs(product.change.pct)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}