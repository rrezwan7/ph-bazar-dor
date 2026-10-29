import type { Product } from "@/lib/api";

type PriceChangesProps = {
  products: Product[];
};

function bangla(value: number | string) {
  return String(value).replace(
    /\d/g,
    (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );
}

function formatPrice(value: number) {
  return `${bangla(
    value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })
  )} টাকা`;
}

function getUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    l: "লিটার",
    gram: "গ্রাম",
    g: "গ্রাম",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "টি",
  };

  return units[unit.trim().toLowerCase()] || unit;
}

export default function PriceChanges({
  products,
}: PriceChangesProps) {
  const risingProducts = products
    .filter(
      (product) =>
        product.change.dir === "up" &&
        product.change.pct > 0
    )
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter(
      (product) =>
        product.change.dir === "down" &&
        product.change.pct !== 0
    )
    .sort(
      (a, b) =>
        Math.abs(b.change.pct) - Math.abs(a.change.pct)
    )
    .slice(0, 6);

  return (
    <>
      <section
        id="price-risers"
        className="w-full bg-white py-8 sm:py-10"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-3">

            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                ▲ আজ দাম বেড়েছে 
              </h2>
            </div>
          </div>

          {risingProducts.length === 0 ? (
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center text-gray-500">
              আজ দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {risingProducts.map((product) => (
                <article
                  key={product.id}
                  className="group flex min-w-0 items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md sm:gap-4 sm:p-4"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
                    {product.image || product.categoryIcon || "🛒"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-gray-800 group-hover:text-green-700">
                      {product.nameBn}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      প্রতি {getUnit(product.unit)}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      আজকের দাম
                    </p>

                    <p className="font-bold text-gray-900">
                      {formatPrice(product.today)}
                    </p>
                  </div>

                  <div className="shrink-0 self-center rounded-lg bg-green-50 px-2.5 py-2 text-right">
                    <p className="text-sm font-bold text-green-700">
                      ▲{" "}
                      {bangla(
                        Math.abs(product.change.pct).toFixed(1)
                      )}
                      %
                    </p>

                    <p className="mt-0.5 text-xs text-green-700">
                      দাম বেড়েছে
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#f3f8f4] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-3">

            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                ▼ আজ দাম কমেছে 
              </h2>
            </div>
          </div>

          {fallingProducts.length === 0 ? (
            <div className="rounded-xl border border-gray-100 bg-white p-6 text-center text-gray-500">
              কোনো পণ্যের দাম কমেনি।
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fallingProducts.map((product) => (
                <article
                  key={product.id}
                  className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-3xl">
                      {product.image || product.categoryIcon || "🛒"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-lg font-semibold text-gray-900 group-hover:text-green-700">
                        {product.nameBn}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        প্রতি {getUnit(product.unit)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-gray-500">
                        আজকের দাম
                      </p>

                      <p className="mt-1 break-words text-lg font-bold text-gray-900">
                        {formatPrice(product.today)}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600">
                      ▼{" "}
                      {bangla(
                        Math.abs(product.change.pct).toFixed(1)
                      )}
                      %
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}