"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import type { Product } from "@/lib/api";

function number(value: number) {
  return value.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
}

function price(value: number) {
  return `${number(value)} টাকা`;
}

function getUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return units[unit.toLowerCase()] || unit;
}

function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-4 py-12">
      <div className="h-64 rounded-3xl bg-gray-200" />

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-28 rounded-2xl bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}

function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      setLoading(true);
      setError(false);
      setProduct(null);

      try {
        const response = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load product");
        }

        const products: Product[] = await response.json();

        const found = products.find(
          (item) => item.slug === slug || String(item.id) === slug
        );

        if (!controller.signal.aborted) {
          setProduct(found || null);
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

    loadProduct();

    return () => controller.abort();
  }, [slug, retry]);

  if (loading) return <Loading />;

  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-5xl">{error ? "⚠️" : "😕"}</p>

          <h1 className="mt-4 text-xl font-bold text-gray-800">
            {error ? "পণ্যের তথ্য লোড করা যায়নি" : "পণ্য পাওয়া যায়নি"}
          </h1>

          {error && (
            <button
              type="button"
              onClick={() => setRetry(retry + 1)}
              className="mt-5 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
            >
              আবার চেষ্টা করুন
            </button>
          )}

          <Link
            href="/"
            className="mt-5 block font-semibold text-green-700"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  const unit = getUnit(product.unit);
  const direction = product.change.dir;
  const markets = product.markets || [];

  const marketPrices = markets
    .flatMap((market) => [market.min, market.max])
    .filter((value) => Number.isFinite(value) && value > 0);

  const summary = [
    {
      label: "সর্বনিম্ন দাম",
      value: marketPrices.length ? Math.min(...marketPrices) : null,
      color: "text-green-700",
    },
    {
      label: "সর্বোচ্চ দাম",
      value: marketPrices.length ? Math.max(...marketPrices) : null,
      color: "text-red-600",
    },
    {
      label: "গড় দাম",
      value: marketPrices.length
        ? marketPrices.reduce((sum, value) => sum + value, 0) /
          marketPrices.length
        : null,
      color: "text-blue-700",
    },
  ];

  const history = [
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <Link
        href="/#সব-পণ্য"
        className="mb-6 inline-flex rounded-lg px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
      >
        ← সব পণ্যে ফিরে যাও
      </Link>

      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 px-6 py-8 text-white sm:px-10 sm:py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white text-6xl shadow-lg">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div>
              <p className="mb-2 text-sm text-green-100">
                {product.categoryNameBn}
              </p>

              <h1 className="text-3xl font-extrabold sm:text-4xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-green-50">
                প্রতি {unit} এর বাজারদর
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8">
          <div className="rounded-2xl border border-green-100 bg-green-50 p-6">
            <p className="text-sm font-medium text-gray-600">
              আজকের দাম
            </p>

            <p className="mt-2 text-3xl font-extrabold text-green-700 sm:text-4xl">
              {price(product.today)}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              প্রতি {unit}
            </p>
          </div>

          <div
            className={`rounded-2xl border p-6 ${
              direction === "up"
                ? "border-green-100 bg-green-50"
                : direction === "down"
                  ? "border-red-100 bg-red-50"
                  : "border-gray-200 bg-gray-50"
            }`}
          >
            <p className="text-sm font-medium text-gray-600">
              গতকালের তুলনায়
            </p>

            <p
              className={`mt-2 text-3xl font-extrabold ${
                direction === "up"
                  ? "text-green-700"
                  : direction === "down"
                    ? "text-red-600"
                    : "text-gray-500"
              }`}
            >
              {direction === "up" ? "▲" : direction === "down" ? "▼" : "—"}{" "}
              {number(Math.abs(product.change.pct))}%
            </p>

            <p className="mt-2 text-sm text-gray-500">
              গতকাল: {price(product.yesterday)}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          📊 দামের সংক্ষিপ্ত বিবরণ
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {summary.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-gray-500">{item.label}</p>

              <p className={`mt-2 text-2xl font-bold ${item.color}`}>
                {item.value === null ? "তথ্য নেই" : price(item.value)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          🗓️ আগের দামের তথ্য
        </h2>

        <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {history.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between px-5 py-4"
            >
              <span className="text-gray-600">{item.label}</span>

              <span className="font-bold text-gray-800">
                {item.value == null ? "তথ্য নেই" : price(item.value)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          🏪 বাজারভিত্তিক দাম
        </h2>

        {markets.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
            এই পণ্যের জন্য আলাদা বাজারের তথ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {markets.map((market, index) => (
              <article
                key={`${market.market}-${index}`}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {market.market}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {market.division}
                    </p>
                  </div>

                  <span className="text-2xl">🏬</span>
                </div>

                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">
                    দাম (প্রতি {unit})
                  </p>

                  <p className="mt-1 text-xl font-bold text-green-700">
                    {price(market.min)} – {price(market.max)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="mt-8 text-center">
        <Link
          href="/#সব-পণ্য"
          className="inline-flex rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          ← বাজারদরের তালিকায় ফিরে যাও
        </Link>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50">
        <Suspense fallback={<Loading />}>
          <ProductDetails />
        </Suspense>
      </main>
    </>
  );
}