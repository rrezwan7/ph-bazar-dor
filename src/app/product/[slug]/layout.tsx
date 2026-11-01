import { Suspense, type ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

async function RequireLogin({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?reason=login-required");
  }

  return <>{children}</>;
}

export default function ProductLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 px-4 py-12 text-center text-gray-500">
          অ্যাকাউন্ট যাচাই হচ্ছে...
        </div>
      }
    >
      <RequireLogin>{children}</RequireLogin>
    </Suspense>
  );
}