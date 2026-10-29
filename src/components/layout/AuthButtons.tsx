"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(
          result.error.message || "সাইন আউট করা যায়নি।"
        );
        return;
      }

      toast.success("সাইন আউট সফল হয়েছে।");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <div
        role="status"
        aria-label="অ্যাকাউন্ট লোড হচ্ছে"
        className="h-9 w-32 animate-pulse rounded-lg bg-gray-100"
      />
    );
  }

  if (error) {
    return (
      <Link
        href="/signin"
        className="text-sm font-medium text-green-700"
      >
        সাইন ইন
      </Link>
    );
  }

  if (session?.user) {
    return (
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <span className="hidden max-w-32 truncate text-sm font-semibold text-gray-700 sm:block">
          {session.user.name}
        </span>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60 sm:text-sm"
        >
          {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-1 sm:gap-3">
      <Link
        href="/signin"
        className="px-2 py-2 text-xs font-medium text-gray-700 transition hover:text-green-600 sm:px-3 sm:text-sm"
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 sm:px-5 sm:py-2.5 sm:text-sm"
      >
        সাইন আপ
      </Link>
    </div>
  );
}