import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Header from "@/components/layout/Header";
import UpdateNameForm from "@/components/profile/UpdateNameForm";

async function UpdateContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <section className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Update Information
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          আপনার নাম পরিবর্তন করুন।
        </p>

        <UpdateNameForm currentName={session.user.name} />
      </section>
    </div>
  );
}

export default function UpdateProfilePage() {
  return (
    <>
      <Header />

      <main className="min-h-[70vh] bg-gray-50">
        <Suspense
          fallback={
            <div className="mx-auto max-w-md animate-pulse px-4 py-12">
              <div className="h-72 rounded-3xl bg-gray-200" />
            </div>
          }
        >
          <UpdateContent />
        </Suspense>
      </main>
    </>
  );
}