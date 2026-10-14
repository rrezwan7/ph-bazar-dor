
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "চাল", slug: "rice" },
  { name: "ডাল", slug: "lentils" },
  { name: "তেল", slug: "oil" },
  { name: "সবজি", slug: "vegetables" },
  { name: "মাছ", slug: "fish" },
  { name: "মাংস", slug: "meat" },
  { name: "ডিম ও দুধ", slug: "eggs-dairy" },
  { name: "মসলা", slug: "spices" },
];

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      {/* Main header */}
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" aria-label="Bazar Dor Homepage">
          <Image
            src="/images/logos/bazar-hero.png"
            alt="Bazar Dor Logo"
            width={150}
            height={55}
            priority
            className="h-auto w-[120px] sm:w-[150px]"
          />
        </Link>

        {/* Login will be implemented in Phase 2 */}
        <span className="rounded-lg bg-[#F0F5F0] px-4 py-2 text-sm font-medium text-[#05893E]">
          লগইন
        </span>
      </div>

      {/* Category navigation */}
      <nav
        aria-label="পণ্যের বিভাগ"
        className="border-t border-gray-100"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-7 overflow-x-auto px-4 py-4">
          {categories.map((category) => (
            <span
              key={category.slug}
              className="shrink-0 text-sm font-medium text-gray-700"
            >
              {category.name}
            </span>
          ))}
        </div>
      </nav>
    </header>
  );
}
