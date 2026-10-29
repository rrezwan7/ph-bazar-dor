import type { Product } from "@/lib/api";

type PriceChangesProps = {
  products: Product[];
};

export default function PriceChanges({ products }: PriceChangesProps) {
  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort(
      (a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct)
    )
    .slice(0, 4);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .sort(
      (a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct)
    )
    .slice(0, 4);

  const sections = [
    {
      title: "দাম বেড়েছে",
      description: "গতকালের তুলনায় বেশি দাম বেড়েছে যেসব পণ্যের",
      products: risingProducts,
      rising: true,
    },
    {
      title: "দাম কমেছে",
      description: "গতকালের তুলনায় বেশি দাম কমেছে যেসব পণ্যের",
      products: fallingProducts,
      rising: false,
    },
  ];

  return (
    <div className="mb-12 grid gap-6 lg:grid-cols-2">
      {sections.map((section) => (
        <section
          key={section.title}
          className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
        >
          <h2
            className={`text-xl font-bold ${
              section.rising ? "text-red-600" : "text-green-700"
            }`}
          >
            {section.rising ? "↑" : "↓"} {section.title}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {section.description}
          </p>

          {section.products.length === 0 ? (
            <p className="mt-6 text-sm text-gray-500">
              এই মুহূর্তে কোনো পণ্য নেই।
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-gray-100">
              {section.products.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between gap-3 py-4"
                >
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#1D271F]">
                      {product.nameBn}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      গতকাল ৳{product.yesterday} / {product.unit}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-bold text-[#1D271F]">
                      ৳{product.today}
                    </p>

                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                        section.rising
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {section.rising ? "↑" : "↓"}{" "}
                      {Math.abs(product.change.pct)}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}