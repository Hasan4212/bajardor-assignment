
"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setError("দুটি পাসওয়ার্ড মিলছে না!");
      return;
    }

    setError("এখন Signup Authentication যুক্ত করতে হবে।");
  }

  return (
    <main className="min-h-[80vh] bg-[#f0f7f1] px-4 py-12 text-[#17352d]">
      <div className="mx-auto max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            আপনার অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-3 text-sm text-[#6b8980] sm:text-base">
            কয়েকটি সহজ ধাপেই আপনি আমাদের সাথে যুক্ত হতে পারবেন।
          </p>
        </div>

        <div className="rounded-2xl border border-white bg-white/90 p-5 shadow-[0_12px_40px_rgba(31,80,53,0.07)] sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                নাম
              </label>
              <input
                id="name"
                type="text"
                placeholder="আপনার পূর্ণ নাম লিখুন"
                autoComplete="name"
                required
                className="w-full rounded-lg border border-[#d6e4e6] px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-[#d6e4e6] px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                placeholder="কমপক্ষে ৬ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                minLength={6}
                required
                className="w-full rounded-lg border border-[#d6e4e6] px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="আবার পাসওয়ার্ড লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
                className="w-full rounded-lg border border-[#d6e4e6] px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 font-bold text-white transition hover:bg-green-800"
            >
              সাইন আপ করুন <span>→</span>
            </button>
          </form>

          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-[#d6e4e6] px-3 py-3 text-sm font-semibold transition hover:bg-gray-50"
            >
              <span className="text-lg font-bold text-blue-600">G</span>
              Google দিয়ে সাইন আপ
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-[#d6e4e6] px-3 py-3 text-sm font-semibold transition hover:bg-gray-50"
            >
              <span className="text-lg">●</span>
              GitHub দিয়ে সাইন আপ
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-bold text-green-700 hover:text-green-900"
            >
              সাইন করুন
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-[#64877b] transition hover:text-green-800"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
