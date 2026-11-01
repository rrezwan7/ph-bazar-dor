"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialLogin({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState<"google" | "github" | null>(
    null
  );

  async function handleLogin(provider: "google" | "github") {
    if (loading || disabled) return;

    setLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(
          result.error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে।"
        );
        setLoading(null);
      }
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoading(null);
    }
  }

  return (
    <div>
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />

        <span className="text-sm text-gray-500">
          অথবা
        </span>

        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <button
        type="button"
        onClick={() => handleLogin("google")}
        disabled={disabled || loading !== null}
        className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 font-semibold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading === "google"
          ? "Connecting..."
          : "Google দিয়ে চালিয়ে যান"}
      </button>

      <button
        type="button"
        onClick={() => handleLogin("github")}
        disabled={disabled || loading !== null}
        className="mt-3 w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading === "github"
          ? "Connecting..."
          : "GitHub দিয়ে চালিয়ে যান"}
      </button>
    </div>
  );
}