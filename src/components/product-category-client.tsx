
"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

type Props = {
  products: Product[];
  categoryid: string;
};

export default function ProductCategoryClient({
  products,
  categoryid,
}: Props) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "price-low") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  const firstProduct = products[0];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-4 pb-26">
      {/* Category Header */}
      <div className="mb-3 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-2xl">
          {firstProduct?.categoryIcon ?? "🛒"}
        </span>

        <div>
          <h1 className="text-base font-semibold text-gray-800">
            {firstProduct?.categoryNameBn ?? categoryid}
          </h1>

          <p className="text-xs text-gray-500">
            প্রতিদিনের বাজারদর ও মূল্য পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sorting Bar */}
      <div className="mb-3 flex items-center justify-end rounded-xl border border-gray-200 bg-white px-4 py-3">
        <label htmlFor="sort" className="mr-2 text-xs text-gray-500">
          সাজান
        </label>

        <select
          id="sort"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-700 outline-none focus:border-green-500"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {/* Products Count */}
      <p className="mb-2 text-xs text-gray-500">
        মোট {sortedProducts.length}টি পণ্যের বাজারদর
      </p>

      {/* Product Cards */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-lg">
                  {product.image &&
                  (product.image.startsWith("http") ||
                    product.image.startsWith("/")) ? (
                    <img
                      src={product.image}
                      alt={product.nameBn}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    product.image || product.categoryIcon || "🛒"
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-gray-800">
                    {product.nameBn}
                  </h2>

                  <p className="text-[11px] text-gray-500">
                    প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-gray-500">
                আজকের বাজার দর
              </p>

              <div className="mt-0.5 flex items-center justify-between gap-2">
                <p className="text-base font-bold text-gray-900">
                  {product.today.toLocaleString("bn-BD")} টাকা
                </p>

                <span
                  className={`whitespace-nowrap rounded-md px-1.5 py-1 text-[10px] font-medium ${
                    product.change.dir === "up"
                      ? "bg-red-50 text-red-600"
                      : product.change.dir === "down"
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {product.change.dir === "up"
                    ? "▲"
                    : product.change.dir === "down"
                      ? "▼"
                      : "—"}{" "}
                  {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </main>
  );
}
