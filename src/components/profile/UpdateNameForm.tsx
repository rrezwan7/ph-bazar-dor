"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateNameForm({
  currentName,
}: {
  currentName: string;
}) {
  const router = useRouter();

  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError("");

    if (!name.trim()) {
      setError("আপনার নাম লিখুন।");
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
      });

      if (result.error) {
        const message =
          result.error.message || "তথ্য আপডেট করা যায়নি।";

        setError(message);
        toast.error(message);
        return;
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে।");
      router.push("/profile");
      router.refresh();
    } catch {
      const message = "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          নাম
        </label>

        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setError("");
          }}
          required
          disabled={loading}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 p-3 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "আপডেট হচ্ছে..." : "Update Information"}
      </button>

      <Link
        href="/profile"
        className="block text-center text-sm font-semibold text-green-700"
      >
        ← প্রোফাইলে ফিরে যান
      </Link>
    </form>
  );
}