import Image from "next/image";
import TodayDate from "@/components/layout/TodayDate";
import Link from "next/link";
import { Suspense } from "react";
import CategoryNav from "@/components/layout/CategoryNav";
import AuthButtons from "@/components/layout/AuthButtons";



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

  <TodayDate />
</div>
            </Link>

           <AuthButtons />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
         <Suspense
  fallback={
    <div
      aria-label="পণ্যের বিভাগ লোড হচ্ছে"
      className="h-12 sm:h-14"
    />
  }
>
  <CategoryNav />
</Suspense>
        </div>
      </div>
    </header>
  );
}