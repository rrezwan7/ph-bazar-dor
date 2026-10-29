import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "চাল", icon: "🍚", slug: "chal" },
  { name: "ডাল", icon: "🌾", slug: "dal" },
  { name: "তেল", icon: "🫙", slug: "tel" },
  { name: "সবজি", icon: "🥬", slug: "sobji" },
  { name: "মাছ", icon: "🐟", slug: "mach" },
  { name: "মাংস", icon: "🍗", slug: "mangsho" },
  { name: "ডিম", icon: "🥚", slug: "dim" },
  { name: "মসলা", icon: "🌶️", slug: "mosla" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[82px] items-center justify-between gap-3">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-3"
            >
              <div className="relative h-11 w-11 shrink-0 sm:h-12 sm:w-12">
                <Image
                  src="/images/logos/logo-icon.png"
                  alt="বাজার দর"
                  fill
                  priority
                  sizes="48px"
                  className="object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="text-lg font-bold text-gray-800 sm:text-xl">
                  বাজার দর
                </p>

                <p className="text-[10px] text-gray-500 sm:text-xs">
                  নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজার মূল্য
                </p>
              </div>
            </Link>

            <div className="flex shrink-0 items-center gap-1 sm:gap-3">
              <button
                type="button"
                disabled
                className="px-2 py-2 text-xs font-medium text-gray-700 sm:px-3 sm:text-sm"
              >
                সাইন ইন
              </button>

              <button
                type="button"
                disabled
                className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white sm:px-5 sm:py-2.5 sm:text-sm"
              >
                সাইন আপ
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <nav
            aria-label="পণ্যের বিভাগ"
            className="flex items-center justify-between overflow-x-auto"
          >
            {categories.map((category) => (
              <span
                key={category.slug}
                className="flex shrink-0 items-center justify-center gap-2 border-b-2 border-transparent px-3 py-3 text-xs font-medium text-gray-700 sm:px-5 sm:py-4 sm:text-sm"
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 text-base sm:text-lg"
                >
                  {category.icon}
                </span>

                <span>{category.name}</span>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}