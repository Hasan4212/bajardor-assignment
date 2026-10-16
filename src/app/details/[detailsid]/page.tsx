
import Link from "next/link";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

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
  categoryid: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
};

type Props = {
  params: Promise<{
    detailsid: string;
  }>;
};

const formatPrice = (price: number) =>
  Number(price ?? 0).toLocaleString("bn-BD");

export default async function DetailsPage({ params }: Props) {
  const { detailsid } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${detailsid}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const product: Product = await res.json();

  const markets = Array.isArray(product.markets)
    ? product.markets
    : [];

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : 0;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : 0;

  const avgPrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) =>
            total + (market.min + market.max) / 2,
          0
        ) / markets.length
      : 0;

  const unitName =
    product.unit === "kg"
      ? "কেজি"
      : product.unit === "liter"
        ? "লিটার"
        : product.unit === "dozen"
          ? "ডজন"
          : product.unit;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-5 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-600">
          হোম
        </Link>

        {" / "}

        <Link
          href={`/category/${product.categoryid}`}
          className="hover:text-green-600"
        >
          {product.categoryNameBn}
        </Link>

        {" / "}

        <span className="text-gray-800">
          {product.nameBn}
        </span>
      </div>

      {/* Product Summary */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-green-50 text-5xl">
            {product.image &&
            (product.image.startsWith("http") ||
              product.image.startsWith("/")) ? (
              <img
                src={product.image}
                alt={product.nameBn}
                className="h-full w-full object-cover"
              />
            ) : (
              product.categoryIcon || "🛒"
            )}
          </div>

          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                {product.categoryIcon} {product.categoryNameBn}
              </span>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                প্রতি {unitName}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              {product.nameBn}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              প্রতিদিনের বাজারদর ও বিভিন্ন বাজারের মূল্য তুলনা করুন।
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-sm text-gray-500">
              আজকের বাজারদর
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {formatPrice(product.today)}
              <span className="ml-1 text-sm font-normal">
                টাকা
              </span>
            </p>

            <span
              className={`mt-2 inline-flex rounded-lg px-2 py-1 text-sm font-medium ${
                product.change?.dir === "up"
                  ? "bg-red-50 text-red-600"
                  : product.change?.dir === "down"
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {product.change?.dir === "up"
                ? "▲"
                : product.change?.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {formatPrice(
                Math.abs(product.change?.pct ?? 0)
              )}%
            </span>
          </div>
        </div>
      </section>

      {/* Price Summary */}
      <section className="mt-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          বাজারদরের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-green-100 bg-green-50 p-5">
            <p className="text-sm text-gray-600">
              সর্বনিম্ন দাম
            </p>
            <p className="mt-2 text-2xl font-bold text-green-700">
              {formatPrice(minPrice)} টাকা
            </p>
          </div>

          <div className="rounded-xl border border-red-100 bg-red-50 p-5">
            <p className="text-sm text-gray-600">
              সর্বোচ্চ দাম
            </p>
            <p className="mt-2 text-2xl font-bold text-red-600">
              {formatPrice(maxPrice)} টাকা
            </p>
          </div>

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm text-gray-600">
              গড় বাজারদর
            </p>
            <p className="mt-2 text-2xl font-bold text-blue-700">
              {formatPrice(Math.round(avgPrice))} টাকা
            </p>
          </div>
        </div>
      </section>

      {/* Previous Prices */}
      <section className="mt-7 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          আগের দিনের সঙ্গে দামের তুলনা
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">গতকাল</p>
            <p className="mt-1 font-semibold text-gray-800">
              {formatPrice(product.yesterday)} টাকা
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">গত সপ্তাহে</p>
            <p className="mt-1 font-semibold text-gray-800">
              {formatPrice(product.lastWeek)} টাকা
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">গত মাসে</p>
            <p className="mt-1 font-semibold text-gray-800">
              {formatPrice(product.lastMonth)} টাকা
            </p>
          </div>
        </div>
      </section>

      {/* Market Prices Table */}
      <section className="mt-7 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            বিভিন্ন বাজারে প্রতি {unitName}-এর সর্বনিম্ন ও সর্বোচ্চ দাম।
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-5 py-3 font-medium">বাজার</th>
                <th className="px-5 py-3 font-medium">বিভাগ</th>
                <th className="px-5 py-3 font-medium">সর্বনিম্ন</th>
                <th className="px-5 py-3 font-medium">সর্বোচ্চ</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {markets.map((market, index) => (
                <tr
                  key={`${market.market}-${index}`}
                  className="transition-colors hover:bg-green-50"
                >
                  <td className="px-5 py-4 font-medium text-gray-800">
                    {market.market}
                  </td>

                  <td className="px-5 py-4 text-gray-500">
                    {market.division}
                  </td>

                  <td className="px-5 py-4 font-semibold text-green-700">
                    {formatPrice(market.min)} টাকা
                  </td>

                  <td className="px-5 py-4 font-semibold text-red-600">
                    {formatPrice(market.max)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {markets.length === 0 && (
            <p className="p-6 text-center text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}
        </div>
      </section>

      {/* Back Button */}
      <div className="mt-7">
        <Link
          href="/"
          className="inline-flex rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
        >
          ← সব পণ্যে ফিরে যান
        </Link>
      </div>
    </main>
  );
}