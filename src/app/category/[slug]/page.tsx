"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import type { Product } from "@/lib/api";


const categories: Record<
  string,
  { name: string; icon: string; apiSlug: string }
> = {
  chal: { name: "চাল", icon: "🍚", apiSlug: "chal" },
  dal: { name: "ডাল", icon: "🫘", apiSlug: "dal" },
  tel: { name: "তেল", icon: "🫙", apiSlug: "tel" },
  sobji: { name: "সবজি", icon: "🥬", apiSlug: "sobji" },
  mach: { name: "মাছ", icon: "🐟", apiSlug: "mach" },
  mangsho: { name: "মাংস", icon: "🍗", apiSlug: "mangsho" },
  dim: { name: "ডিম-দুধ", icon: "🥚", apiSlug: "dim-dui" },
  mosla: { name: "মসলা", icon: "🌶️", apiSlug: "mosla" },
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
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "টি",
  };

  return units[unit.toLowerCase()] || unit;
}

function CategoryContent() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories[slug];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sort, setSort] = useState("default");
  const [retry, setRetry] = useState(0);

  const apiSlug = category?.apiSlug;

  useEffect(() => {
    if (!apiSlug) return;

    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError(false);
      setProducts([]);

      try {
        const response = await fetch(
          `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(apiSlug!)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data: Product[] = await response.json();

        if (!controller.signal.aborted) {
          setProducts(data);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [apiSlug, retry]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.today - b.today;
    if (sort === "high") return b.today - a.today;
    return 0;
  });

  if (!category) {
    return (
      <>
        <Header />

        <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <p className="text-5xl">😕</p>

            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              ক্যাটাগরি পাওয়া যায়নি
            </h1>

            <Link
              href="/"
              className="mt-5 inline-block rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
            >
              ← হোমে ফিরে যাও
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="text-sm font-semibold text-green-700 hover:text-green-800"
          >
            ← হোমে ফিরে যাও
          </Link>

          <section className="mt-5 flex flex-col justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-4xl">
                {category.icon}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {category.name}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  {loading
                    ? "লোড হচ্ছে..."
                    : `মোট ${bangla(products.length)}টি পণ্য`}
                </p>
              </div>
            </div>

            <label className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-600">
              সাজান:

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 outline-none focus:border-green-500"
              >
                <option value="default">ডিফল্ট</option>
<option value="low">দাম: কম থেকে বেশি</option>
<option value="high">দাম: বেশি থেকে কম</option>
              </select>
            </label>
          </section>

          {loading ? (
            <p className="py-12 text-center text-gray-500">
              পণ্যের তথ্য লোড হচ্ছে...
            </p>
          ) : error ? (
            <div className="mt-8 rounded-2xl bg-white p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                পণ্য লোড করা যায়নি
              </h2>

              <p className="mt-2 text-gray-500">
                ইন্টারনেট বা API ঠিক আছে কি না পরীক্ষা করে আবার চেষ্টা করো।
              </p>

              <button
                type="button"
                onClick={() => setRetry(retry + 1)}
                className="mt-5 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
              >
                আবার চেষ্টা করো
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="mt-8 rounded-2xl bg-white px-5 py-12 text-center shadow-sm">
              <p className="text-5xl">{category.icon}</p>

              <h2 className="mt-4 text-xl font-bold text-gray-800">
                এই ক্যাটাগরিতে পণ্য পাওয়া যায়নি
              </h2>

              <p className="mt-2 text-gray-500">
                পরে আবার চেষ্টা করো।
              </p>
            </div>
          ) : (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product) => {
                const direction = product.change.dir;

                return (
                  <Link
                    key={product.id} href={`/product/${product.slug || product.id}`}
                    className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
                        {product.image ||
                          product.categoryIcon ||
                          category.icon}
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
  direction === "up"
    ? "bg-green-50 text-green-700"
    : direction === "down"
      ? "bg-red-50 text-red-600"
      : "bg-gray-100 text-gray-500"
}`}
                      >
                        {direction === "same"
                          ? "—"
                          : `${direction === "up" ? "▲" : "▼"} ${bangla(
                              Math.abs(product.change.pct)
                            )}%`}
                      </span>
                    </div>

                    <h2 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-green-700">
                      {product.nameBn}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      প্রতি {getUnit(product.unit)}
                    </p>

                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <p className="text-xs text-gray-500">
                        আজকের দাম
                      </p>

                      <p className="mt-1 text-2xl font-bold text-gray-900">
                        {bangla(product.today)} টাকা
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 px-4 py-12 text-center text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে...
        </div>
      }
    >
      <CategoryContent />
    </Suspense>
  );
}