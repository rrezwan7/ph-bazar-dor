export default function Hero() {
  return (
    <section className="mb-10 overflow-hidden rounded-2xl bg-[#EEF7EE] px-6 py-10 sm:px-10 sm:py-14">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-[#05893E]">
            প্রতিদিনের বাজার, সঠিক দামে
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#1D271F] sm:text-4xl">
            আজকের বাজার দর
            <span className="mt-2 block text-[#05893E]">
              জানুন সহজেই
            </span>
          </h1>

          <p className="mt-4 max-w-lg leading-7 text-gray-600">
            চাল, ডাল, তেল, মাছ, মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের
            দাম দেখুন। গতকালের সঙ্গে তুলনা করে পরিকল্পনা করুন
            আজকের বাজার।
          </p>

          <a
            href="#all-products"
            className="mt-6 inline-flex rounded-lg bg-[#05893E] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#046D32]"
          >
            বাজার দর দেখুন
          </a>
        </div>

        <div
          aria-hidden="true"
          className="grid grid-cols-3 gap-3 sm:gap-4"
        >
          {["🍚", "🥔", "🧅", "🥬", "🐟", "🥚"].map((item) => (
            <div
              key={item}
              className="flex aspect-square items-center justify-center rounded-2xl bg-white/80 text-5xl sm:text-6xl"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}