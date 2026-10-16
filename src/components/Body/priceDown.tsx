
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
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
    dir: "up" | "down";
    pct: number;
  };
}

export default function PriceDownProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products"
        );

        if (!response.ok) {
          throw new Error("পণ্যের তথ্য লোড করা যায়নি");
        }

        const data: Product[] = await response.json();

        const decreasedProducts = data.filter(
          (product) => product.change?.dir === "down"
        );

        setProducts(decreasedProducts);
      } catch {
        setError("পণ্যের তথ্য লোড করতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <p className="py-10 text-center text-gray-500">
        পণ্যের তথ্য লোড হচ্ছে...
      </p>
    );
  }

  if (error) {
    return (
      <p className="py-10 text-center text-red-500">
        {error}
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
          যেসব পণ্যের দাম কমেছে
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          আজকের বাজারে দাম কমে যাওয়া পণ্যগুলোর তালিকা
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/details/${product.id}`}
            className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
            aria-label={`${product.nameBn} এর বিস্তারিত দেখুন`}
          >
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
                    {product.categoryIcon}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      {product.nameBn}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {product.categoryNameBn}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                  ▼ {product.change.pct}%
                </span>
              </div>

              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500">
                  আজকের দাম
                </p>

                <p className="mt-1 text-2xl font-extrabold text-gray-900">
                  ৳{product.today.toLocaleString("bn-BD")}

                  <span className="ml-1 text-sm font-normal text-gray-500">
                    / {product.unit}
                  </span>
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  গতকাল: ৳
                  {product.yesterday.toLocaleString("bn-BD")}
                </p>

                <p className="mt-4 text-sm font-semibold text-green-700">
                  বিস্তারিত দেখুন →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <p className="py-10 text-center text-gray-500">
          দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
