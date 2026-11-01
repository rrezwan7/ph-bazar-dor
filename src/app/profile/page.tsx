import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import Header from "@/components/layout/Header";

async function ProfileContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const { user } = session;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href="/"
        className="text-sm font-semibold text-green-700 hover:text-green-800"
      >
        ← হোমে ফিরে যাও
      </Link>

      <section className="mt-6 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-green-700 to-emerald-500 px-6 py-8 text-white">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-3xl font-bold text-green-700">
            {user.name.trim().charAt(0).toUpperCase() || "👤"}
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-green-100">
            আপনার অ্যাকাউন্টের তথ্য
          </p>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <p className="text-sm text-gray-500">নাম</p>

            <p className="mt-1 break-words text-lg font-semibold text-gray-900">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">ইমেইল</p>

            <p className="mt-1 break-all font-medium text-gray-900">
              {user.email}
            </p>
          </div>
          <Link
  href="/profile/update"
  className="inline-flex rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
>
  Update Information
</Link>
        </div>
      </section>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <>
      <Header />

      <main className="min-h-[70vh] bg-gray-50">
        <Suspense
          fallback={
            <div className="mx-auto max-w-2xl animate-pulse px-4 py-12">
              <div className="h-80 rounded-3xl bg-gray-200" />
            </div>
          }
        >
          <ProfileContent />
        </Suspense>
      </main>
    </>
  );
}