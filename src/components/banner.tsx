
import Image from "next/image";
import { connection } from "next/server";

const Banner = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Banner Image */}
          <div className="order-1 flex w-full items-center justify-center bg-green-50 p-5 sm:p-8 lg:order-2 lg:w-[45%] lg:p-6">
            <Image
              src="/bazar-hero.png"
              alt="আজকের বাজার"
              width={600}
              height={400}
              priority
              className="h-52 w-full object-contain sm:h-64 lg:h-80"
            />
          </div>

          {/* Banner Content */}
          <div className="order-2 w-full p-5 sm:p-8 lg:order-1 lg:w-[55%] lg:p-10">
            {/* Date Badge */}
            <div className="mb-5 inline-flex max-w-full items-center rounded-full border border-green-200 bg-green-50 px-3 py-2 text-xs font-light leading-relaxed text-green-700 sm:px-4 sm:text-sm">
              {date}
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl xl:text-5xl">
              আজকের বাজারের দাম{" "}
              <span className="text-green-600">এক নজরে</span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm font-light leading-7 text-gray-600 sm:text-base sm:leading-8">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Button */}
            <div className="mt-6">
              <button
                type="button"
                className="group inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto sm:text-base"
              >
                সকল পণ্য দেখুন →
              </button>
            </div>

            {/* Small Info */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                বাজারদরের আপডেট
              </span>

              <span>সহজ ও নির্ভরযোগ্য তথ্য</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
