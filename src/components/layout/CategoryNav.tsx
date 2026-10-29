"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "চাল", icon: "🍚", slug: "chal" },
  { name: "ডাল", icon: "🌾", slug: "dal" },
  { name: "তেল", icon: "🫙", slug: "tel" },
  { name: "সবজি", icon: "🥬", slug: "sobji" },
  { name: "মাছ", icon: "🐟", slug: "mach" },
  { name: "মাংস", icon: "🍗", slug: "mangsho" },
  { name: "ডিম-মধু", icon: "🥚", slug: "dim" },
  { name: "মসলা", icon: "🌶️", slug: "mosla" },
];

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="পণ্যের বিভাগ"
      className="flex items-center justify-between overflow-x-auto"
    >
      {categories.map((category) => {
        const href = `/category/${category.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={category.slug}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex shrink-0 items-center justify-center gap-2 border-b-2 px-3 py-3 text-xs font-medium transition sm:px-5 sm:py-4 sm:text-sm ${
              isActive
                ? "border-green-600 bg-green-50 text-green-600"
                : "border-transparent text-gray-700 hover:bg-green-50 hover:text-green-600"
            }`}
          >
            <span
              aria-hidden="true"
              className="shrink-0 text-base sm:text-lg"
            >
              {category.icon}
            </span>

            <span>{category.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}