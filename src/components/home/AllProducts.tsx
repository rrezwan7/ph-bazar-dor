import type { Product } from "@/lib/api";
import Link from "next/link";

type AllProductsProps = {
  products: Product[];
};

function bangla(value: number) {
  return String(value).replace(
    /\d/g,
    (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );
}

function getUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "টি",
  };

  return units[unit.toLowerCase()] || unit;
}

export default function AllProducts({
  products,
}: AllProductsProps) {
  const visibleProducts = products;

  return (
    <section
      id="সব-পণ্য"
      className="scroll-mt-40 bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              সব পণ্য
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              মোট {bangla(visibleProducts.length)} টি পণ্য দেখানো হচ্ছে
            </p>
            
          </div>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">
            কোনো পণ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => {
              const icon =
                product.image || product.categoryIcon || "🛒";

              return (
               <Link
  key={product.id}
  href={`/product/${product.slug || product.id}`}
  className="group rounded-2xl border border-gray-200 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
>
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-green-50">
                    <span
                      className="text-5xl leading-none"
                      role="img"
                      aria-label={product.nameBn}
                    >
                      {icon}
                    </span>
                  </div>

                  <h3 className="min-h-12 text-base font-semibold text-gray-900 group-hover:text-green-700">
                    {product.nameBn}
                  </h3>

                 <p className="mt-2 text-xs text-gray-500">
  আজকের দাম
</p>

<p className="mt-1 text-lg font-bold text-green-700">
  {product.today.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  })} টাকা
</p>

                  <p className="mt-1 text-xs text-gray-500">
                    প্রতি {getUnit(product.unit)}
                  </p>

                  <p
                   className={`mt-2 text-xs font-medium ${
  product.change.dir === "up"
    ? "text-green-700"
    : product.change.dir === "down"
      ? "text-red-600"
      : "text-gray-500"
}`}
                  >
                    {product.change.dir === "up"
                      ? "▲"
                      : product.change.dir === "down"
                        ? "▼"
                        : "—"}{" "}
                    {bangla(Math.abs(product.change.pct))}%
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}