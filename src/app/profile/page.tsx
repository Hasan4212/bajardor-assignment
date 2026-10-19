
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: session, isPending } = authClient.useSession();

  const [newName, setNewName] = useState("");
  const [preview, setPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session?.user) {
      setNewName(session.user.name || "");
    }
  }, [session?.user]);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setError("শুধু ছবির ফাইল নির্বাচন করুন।");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("ছবির সাইজ সর্বোচ্চ ৫ MB হতে পারবে।");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setError("প্রথমে একটি ছবি নির্বাচন করুন।");
      return;
    }

    setImageLoading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.url) {
        throw new Error(
          result.error || "ছবি আপলোড করা যায়নি।"
        );
      }

      const { error: updateError } =
        await authClient.updateUser({
          image: result.url,
        });

      if (updateError) {
        throw new Error(
          updateError.message || "প্রোফাইল আপডেট করা যায়নি।"
        );
      }

      setSelectedFile(null);
      setPreview("");
      setMessage("প্রোফাইল ছবি সফলভাবে আপডেট হয়েছে!");

      await authClient.getSession();
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "ছবি আপলোড করতে সমস্যা হয়েছে।"
      );
    } finally {
      setImageLoading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!newName.trim()) {
      setError("আপনার নাম লিখুন।");
      setMessage("");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error: updateError } =
        await authClient.updateUser({
          name: newName.trim(),
        });

      if (updateError) {
        setError(
          updateError.message || "নাম আপডেট করা যায়নি।"
        );
        return;
      }

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে!");
    } catch {
      setError("কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error: signOutError } =
        await authClient.signOut();

      if (signOutError) {
        setError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      router.replace("/signin");
      router.refresh();
    } catch {
      setError("সাইন আউট করার সময় সমস্যা হয়েছে।");
    }
  };

  if (isPending || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5ef]">
        <p className="text-sm text-gray-500">
          প্রোফাইল লোড হচ্ছে...
        </p>
      </main>
    );
  }

  const user = session.user;
  const profileImage = preview || user.image || "";

  return (
    <main className="min-h-screen bg-[#f0f5ef] px-4 py-8 text-gray-800">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Information */}
        <section className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex min-w-0 items-center gap-3">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt="Profile"
                className="h-14 w-14 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
                {(user.name || user.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate font-semibold">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="truncate text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="shrink-0 rounded-lg border border-red-300 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
          >
            ↪ সাইন আউট
          </button>
        </section>

        {/* Profile Picture */}
        <section className="mb-4 rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            প্রোফাইল ছবি
          </h2>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profileImage}
                alt="Profile preview"
                className="h-24 w-24 rounded-full border-4 border-green-100 object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-700">
                {(user.name || user.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <div className="w-full flex-1">
              <p className="mb-3 text-sm text-gray-500">
                JPG, PNG বা WebP ছবি নির্বাচন করুন।
                সর্বোচ্চ সাইজ ৫ MB।
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageSelect}
                className="mb-3 block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-green-50 file:px-4 file:py-2 file:font-medium file:text-green-700 hover:file:bg-green-100"
              />

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleImageUpload}
                  disabled={!selectedFile || imageLoading}
                  className="rounded-lg bg-[#078b49] px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {imageLoading
                    ? "আপলোড হচ্ছে..."
                    : "ছবি আপলোড করুন"}
                </button>

                {selectedFile && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview("");
                      setError("");

                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    disabled={imageLoading}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    বাতিল
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Update Name */}
        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold">
            ব্যক্তিগত তথ্য
          </h2>

          <form onSubmit={handleUpdate}>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              required
              className="mb-4 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#078b49] py-2.5 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "নাম আপডেট করুন"}
            </button>
          </form>

          {message && (
            <p className="mt-3 text-center text-sm text-green-700">
              {message}
            </p>
          )}

          {error && (
            <p className="mt-3 text-center text-sm text-red-600">
              {error}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
