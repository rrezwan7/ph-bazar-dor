import Header from "@/components/layout/Header";
import PriceTicker from "@/components/home/PriceTicker";
import { getProducts, type Product } from "@/lib/api";
import Hero from "@/components/home/Hero";
export const instant = false;

export default async function HomePage() {

  let products: Product[] = [];
  let error = false;

  try {
    products = await getProducts();
  } catch {
    error = true;
  }

  // Keep the rest of your existing JSX unchanged.

  return (
    <>
      <Header />
      <PriceTicker products={products} />

      <main className="mx-auto w-full max-w-7xl px-4 py-10">
      <Hero />

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            পণ্যের তথ্য লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
          </div>
        ) : (
          <>
            <div
  id="all-products"
  className="mb-5 flex scroll-mt-24 items-center justify-between"
>
              <h2 className="text-xl font-bold text-[#1D271F]">
                সকল পণ্য
              </h2>

              <span className="text-sm text-gray-500">
                মোট {products.length}টি পণ্য
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F0F5F0] text-3xl">
                      {product.image || product.categoryIcon}
                    </span>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                      {product.categoryNameBn}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#1D271F]">
                    {product.nameBn}
                  </h3>

                  <p className="mt-3 text-sm text-gray-500">
                    বর্তমান বাজারদর
                  </p>

                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#05893E]">
                      ৳{product.today}
                    </span>

                    <span className="text-sm text-gray-500">
                      / {product.unit}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
                    <span className="text-gray-500">
                      গতকালের দাম
                    </span>

                    <span className="font-medium text-gray-700">
                      ৳{product.yesterday}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      মূল্য পরিবর্তন
                    </span>

                    <span
                      className={
                        product.change.dir === "up"
                          ? "font-semibold text-red-600"
                          : product.change.dir === "down"
                            ? "font-semibold text-green-700"
                            : "font-semibold text-gray-500"
                      }
                    >
                      {product.change.dir === "up"
                        ? "↑"
                        : product.change.dir === "down"
                          ? "↓"
                          : "—"}{" "}
                      {Math.abs(product.change.pct)}%
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}