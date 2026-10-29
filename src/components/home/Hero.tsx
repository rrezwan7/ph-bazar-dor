import Image from "next/image";
import TodayDate from "@/components/layout/TodayDate";

export default function Hero() {
  return (
    <section className="bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-h-[350px] overflow-hidden rounded-2xl bg-gradient-to-r from-green-50 to-green-100 lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
            <p className="mb-4 w-fit rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              <TodayDate />
            </p>

            <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              <span>আজকের বাজারের দাম এক নজরে
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
              চাল,ডাল,তেল,সবজি,মাছ,মাংসসহ বাজারভিত্তিক বিস্তারিত গড়, সর্বনিম্ন সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়
            </p>

            <div className="mt-6">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                সব পণ্য দেখুন
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="flex min-h-[280px] items-end justify-center lg:min-h-[350px]">
            <Image
              src="/images/logos/bazar-hero.png"
              alt="বাজারের তাজা সবজি"
              width={650}
              height={450}
              priority
              className="h-auto w-full max-w-[600px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}