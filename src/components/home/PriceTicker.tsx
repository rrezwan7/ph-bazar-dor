"use client";

import Marquee from "react-fast-marquee";
import type { Product } from "@/lib/api";

type PriceTickerProps = {
  products: Product[];
};

function toBanglaNumber(value: number) {
  return String(value).replace(
    /\d/g,
    (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div
      className="price-ticker-wrapper"
      aria-label="বাজারদরের আপডেট"
    >
      <Marquee
        direction="left"
        speed={80}
        gradient={false}
        pauseOnHover
        autoFill
      >
        {products.map((product) => (
          <div className="price-item" key={product.id}>
            <span className="price-icon">
              {product.image || product.categoryIcon || "🛒"}
            </span>

            <span className="price-name">
              {product.nameBn}
            </span>

            <span className="price-value">
              {toBanglaNumber(product.today)} টাকা/{product.unit}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "price-up"
                  : product.change.dir === "down"
                    ? "price-down"
                    : "price-value"
              }
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {toBanglaNumber(Math.abs(product.change.pct))}%
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}