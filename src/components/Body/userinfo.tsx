"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

type ToastType = "success" | "error";

const Userinfo = () => {
  const { data: session, isPending } = authClient.useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const user = session?.user;

  function showToast(
    message: string,
    type: ToastType = "success"
  ) {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 3500);
  }

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        showToast(
          "লগআউট করা যায়নি। আবার চেষ্টা করুন।",
          "error"
        );
        return;
      }

      setMenuOpen(false);
      showToast("সফলভাবে লগআউট হয়েছে! 👋");

      window.setTimeout(() => {
        window.location.href = "/signin";
      }, 1200);
    } catch {
      showToast("কিছু একটা সমস্যা হয়েছে!", "error");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <div className="h-10 w-24 animate-pulse rounded-full bg-gray-100" />
    );
  }

  return (
    <>
      {/* Toast Notification */}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex flex-col gap-3 sm:right-6 sm:top-6">
        {toast && (
          <div
            role="status"
            aria-live="polite"
            className={`pointer-events-auto flex min-w-[280px] max-w-sm items-center gap-3 rounded-2xl border p-4 shadow-2xl ${
              toast.type === "success"
                ? "border-green-200 bg-white text-green-800"
                : "border-red-200 bg-white text-red-700"
            }`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
                toast.type === "success"
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >
              {toast.type === "success" ? "✓" : "!"}
            </span>

            <p className="flex-1 text-sm font-semibold">
              {toast.message}
            </p>

            <button
              type="button"
              aria-label="নোটিফিকেশন বন্ধ করুন"
              onClick={() => setToast(null)}
              className="text-lg text-gray-400 transition hover:text-gray-700"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        {user ? (
          <div className="relative">
            {/* User Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="ইউজার মেনু"
              className="flex items-center gap-3 rounded-full border border-green-100 bg-white py-1.5 pl-1.5 pr-3 shadow-sm transition hover:border-green-300 hover:shadow-md"
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="h-10 w-10 rounded-full border-2 border-green-100 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-400 text-lg font-bold text-white">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}

              <div className="hidden text-left sm:block">
                <p className="max-w-32 truncate text-sm font-bold text-gray-800">
                  {user.name || "ব্যবহারকারী"}
                </p>
                <p className="text-xs text-green-600">
                  অ্যাকাউন্ট
                </p>
              </div>

              <svg
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.09 1.03l-4.25 4.5a.75.75 0 01-1.09 0l-4.25-4.5a.75.75 0 01.02-1.05z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <>
                <button
                  type="button"
                  aria-label="মেনু বন্ধ করুন"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setMenuOpen(false)}
                />

                <div className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                  {/* User Details */}
                  <div className="border-b border-gray-100 bg-green-50/70 px-4 py-4">
                    <p className="truncate font-bold text-gray-800">
                      {user.name || "ব্যবহারকারী"}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <Link
                      href="/"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                    >
                      <span className="text-lg">⌂</span>
                      হোম পেজ
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                    >
                      <span className="text-lg">👤</span>
                      আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                    >
                      <span className="text-lg">↪</span>
                      {signingOut
                        ? "লগআউট হচ্ছে..."
                        : "লগআউট"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Sign In / Sign Up */
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-600 hover:bg-green-50 hover:text-green-700 active:scale-95"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-green-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
            >
              সাইন আপ
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Userinfo;