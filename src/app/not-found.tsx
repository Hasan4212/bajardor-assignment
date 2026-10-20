
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-8xl font-extrabold text-green-600">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-bold text-gray-800">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="mt-3 max-w-md text-gray-600">
        দুঃখিত! আপনি যে পেজটি খুঁজছেন, সেটি পাওয়া যাচ্ছে না।
        পেজটি সরানো হতে পারে অথবা লিংকটি ভুল হতে পারে।
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default NotFound;



