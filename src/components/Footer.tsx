const Footer = () => {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-6 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-5 shadow-sm sm:flex-row sm:px-7">

        <p className="text-center text-sm font-medium text-gray-700 sm:text-left">
          <span className="text-green-600">বাজার দর</span>
          {" "}— প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="max-w-xl text-center text-xs leading-6 text-gray-500 sm:text-right sm:text-sm">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>

      </div>

      <p className="pt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
      </p>
    </footer>
  );
};

export default Footer;