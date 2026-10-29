import Header from "@/components/layout/Header";
import PriceTicker from "@/components/home/PriceTicker";
import Hero from "@/components/home/Hero";
import PriceChanges from "@/components/home/PriceChanges";
import AllProducts from "@/components/home/AllProducts";
import { getProducts, type Product } from "@/lib/api";

export const instant = false;

export default async function HomePage() {
  let products: Product[] = [];
  let error = false;

  try {
    products = await getProducts();
  } catch {
    error = true;
  }

  return (
    <>
      <Header />
      <PriceTicker products={products} />

      <main className="w-full bg-gray-50 pb-12">
        <Hero />

        {error ? (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
              পণ্যের তথ্য লোড করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
            </div>
          </div>
        ) : (
          <>
            <PriceChanges products={products} />
            <AllProducts products={products} />
          </>
        )}
      </main>
    </>
  );
}