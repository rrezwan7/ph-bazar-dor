import Link from "next/link";
import Header from "@/components/layout/Header";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="text-6xl font-extrabold text-green-600">
            ৪০৪
          </p>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            পেজ পাওয়া যায়নি
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
            ঠিকানাটি পরীক্ষা করুন অথবা হোম পেজে ফিরে যান।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    </>
  );
}