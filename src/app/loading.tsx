export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
      className="min-h-screen bg-gray-50 px-4 py-10"
    >
      <div className="mx-auto max-w-7xl animate-pulse">
        <p className="sr-only">পণ্যের তথ্য লোড হচ্ছে...</p>

        <div className="mb-10 h-80 rounded-2xl bg-gray-200" />

        <div className="mb-6 h-8 w-56 rounded bg-gray-200" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-white p-5"
            >
              <div className="h-14 w-14 rounded-xl bg-gray-200" />
              <div className="mt-4 h-5 w-2/3 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
              <div className="mt-5 h-7 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}