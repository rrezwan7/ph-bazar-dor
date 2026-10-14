
type PriceItem = {
  id: number;
  name: string;
  price: number;
  unit: string;
  change: number;
};

const prices: PriceItem[] = [
  { id: 1, name: "মিনিকেট চাল", price: 72, unit: "কেজি", change: 2 },
  { id: 2, name: "মসুর ডাল", price: 130, unit: "কেজি", change: -5 },
  { id: 3, name: "সয়াবিন তেল", price: 180, unit: "লিটার", change: 3 },
  { id: 4, name: "আলু", price: 35, unit: "কেজি", change: -2 },
  { id: 5, name: "পেঁয়াজ", price: 65, unit: "কেজি", change: 0 },
];

export default function PriceTicker() {
  return (
    <section
      aria-label="বাজারদরের সর্বশেষ পরিবর্তন"
      className="border-b border-gray-200 bg-[#F0F5F0]"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <span className="shrink-0 rounded-md bg-[#05893E] px-3 py-2 text-sm font-semibold text-white">
          বাজার আপডেট
        </span>

        <div className="flex min-w-0 gap-6 overflow-x-auto py-1">
          {prices.map((item) => (
            <div
              key={item.id}
              className="flex shrink-0 items-center gap-2 text-sm"
            >
              <span className="font-medium text-[#1D271F]">
                {item.name}
              </span>

              <span className="text-gray-600">
                ৳{item.price}/{item.unit}
              </span>

              <span
                className={
                  item.change > 0
                    ? "font-semibold text-red-600"
                    : item.change < 0
                      ? "font-semibold text-green-700"
                      : "font-semibold text-gray-500"
                }
              >
                {item.change > 0
                  ? `↑ ৳${item.change}`
                  : item.change < 0
                    ? `↓ ৳${Math.abs(item.change)}`
                    : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
