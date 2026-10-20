
const Loading = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4">
      {/* Loading Spinner */}
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>
        <span className="text-2xl">🛒</span>
      </div>

      {/* Loading Text */}
      <h2 className="mt-6 text-xl font-bold text-gray-800">
        একটু অপেক্ষা করুন...
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        বাজারদরের তথ্য লোড হচ্ছে
      </p>

      {/* Loading Dots */}
      <div className="mt-4 flex gap-2">
        <span className="h-2 w-2 animate-bounce rounded-full bg-green-600"></span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:150ms]"></span>
        <span className="h-2 w-2 animate-bounce rounded-full bg-green-600 [animation-delay:300ms]"></span>
      </div>
    </div>
  );
};

export default Loading;
