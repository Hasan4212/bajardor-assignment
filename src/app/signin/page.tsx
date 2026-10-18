
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        const message =
          result.error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।";

        setError(message);
        toast.error("লগইন ব্যর্থ হয়েছে!", {
          description: message,
        });
        return;
      }

      toast.success("লগইন সফল হয়েছে!", {
        description: "স্বাগতম! হোম পেজে নিয়ে যাওয়া হচ্ছে।",
      });

      router.push("/");
      router.refresh();
    } catch {
      const message = "লগইন করা যায়নি। আবার চেষ্টা করুন।";
      setError(message);
      toast.error("সমস্যা হয়েছে!", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  } 


const handleGoogleSignIn = async () => {
  try {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error("Google Login ব্যর্থ হয়েছে!", {
        description: error.message || "আবার চেষ্টা করুন।",
      });
    }
  } catch {
    toast.error("সমস্যা হয়েছে!", {
      description: "Google দিয়ে আবার চেষ্টা করুন।",
    });
  }
};


  return (
    <main className="min-h-[80vh] bg-[#f0f7f1] px-4 py-12 text-[#17352d]">
      <div className="mx-auto max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            আপনার অ্যাকাউন্টে লগইন করুন
          </h1>
          <p className="mt-3 text-sm text-[#6b8980] sm:text-base">
            আপনার অ্যাকাউন্টে প্রবেশ করতে নিচের তথ্যগুলো দিন।
          </p>
        </div>

        <div className="rounded-2xl border border-white bg-white/90 p-5 shadow-[0_12px_40px_rgba(31,80,53,0.07)] sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                disabled={loading}
                className="w-full rounded-lg border border-[#d6e4e6] bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

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
                disabled={loading}
                className="w-full rounded-lg border border-[#d6e4e6] bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
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



            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>



          <p className="text-center text-sm text-gray-500">
            নতুন ব্যবহারকারী?{" "}
            <Link
              href="/signup"
              className="font-bold text-green-700 hover:text-green-900"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p> 



{/* google and github login */}

          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">


<button
  onClick={handleGoogleSignIn}
  type="button"
  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#d6e4e6] px-3 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-green-600 hover:bg-green-50 hover:shadow-md active:translate-y-0"
>
  <span className="text-lg font-bold text-blue-600">G</span>
  Google দিয়ে সাইন ইন করুন
</button>


            <button
              type="button"
              disabled
              className="flex items-center justify-center gap-2 rounded-lg border border-[#d6e4e6] px-3 py-3 text-sm font-semibold opacity-60"
            >
              <span className="text-lg">●</span>
              GitHub দিয়ে সাইন ইন করুন 
            </button>
          </div>




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
