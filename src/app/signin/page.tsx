
"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // এখানে তোমার Login Authentication যুক্ত করবে।
    setError("Login Authentication এখনো যুক্ত করা হয়নি।");
  }

  return (
    <main className="min-h-[80vh] bg-[#f0f7f1] px-4 py-12 text-[#17352d]">
      <div className="mx-auto max-w-lg">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            আপনার অ্যাকাউন্টে লগইন করুন
          </h1>

          <p className="mt-3 text-sm text-[#6b8980] sm:text-base">
            আপনার অ্যাকাউন্টে প্রবেশ করতে নিচের তথ্যগুলো দিন।
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-white bg-white/90 p-5 shadow-[0_12px_40px_rgba(31,80,53,0.07)] sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold"
              >
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full rounded-lg border border-[#d6e4e6] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                type="password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-[#d6e4e6] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />

              <div className="mt-2 text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-green-700 hover:text-green-900"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800"
            >
              লগইন করুন <span>→</span>
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-[#d6e4e6] px-3 py-3 text-sm font-semibold transition hover:bg-gray-50"
            >
              <span className="text-lg font-bold text-blue-600">G</span>
              Google দিয়ে লগইন
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-[#d6e4e6] px-3 py-3 text-sm font-semibold transition hover:bg-gray-50"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.5-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.76 2.04 3.53 1.46.1-.72.39-1.21.7-1.49-2.5-.28-5.13-1.25-5.13-5.55 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.12 2.98.72.79 1.15 1.79 1.15 3.02 0 4.31-2.64 5.26-5.15 5.54.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
              </svg>
              GitHub দিয়ে লগইন
            </button>
          </div>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            নতুন ব্যবহারকারী?{" "}
            <Link
              href="/signup"
              className="font-bold text-green-700 hover:text-green-900"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>
        </div>

        {/* Back Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#64877b] transition hover:text-green-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
