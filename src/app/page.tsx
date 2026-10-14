
import Header from "../components/layout/Header"
import PriceTicker from "../components/home/PriceTicker";

export default function HomePage() {
  return (
    <>
      <Header />
      <PriceTicker />

      <main className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold text-[#1D271F]">
          আজকের বাজার দর
        </h1>

        <p className="mt-3 text-gray-600">
          প্রতিদিনের প্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর জানুন।
        </p>
      </main>
    </>
  );
}
