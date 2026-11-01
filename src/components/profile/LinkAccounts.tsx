"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LinkAccounts() {
  const [loading, setLoading] = useState<string | null>(null);

  async function connect(provider: "google" | "github") {
    if (loading) return;

    setLoading(provider);

    try {
      const result = await authClient.linkSocial({
        provider,
        callbackURL: "/profile",
      });

      if (result.error) {
        toast.error(
          result.error.message || "অ্যাকাউন্ট সংযুক্ত করা যায়নি।"
        );
        setLoading(null);
      }
    } catch {
      toast.error("আবার চেষ্টা করুন।");
      setLoading(null);
    }
  }

  return (
    <div className="space-y-3 border-t border-gray-100 pt-6">
      <h2 className="font-semibold text-gray-900">
        Connect Accounts
      </h2>

      <button
        type="button"
        onClick={() => connect("google")}
        disabled={loading !== null}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-60"
      >
        {loading === "google" ? "Connecting..." : "Connect Google"}
      </button>

      <button
        type="button"
        onClick={() => connect("github")}
        disabled={loading !== null}
        className="w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white hover:bg-black disabled:opacity-60"
      >
        {loading === "github" ? "Connecting..." : "Connect GitHub"}
      </button>
    </div>
  );
}