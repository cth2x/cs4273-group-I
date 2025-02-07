import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* Hero Section */}
      <main className="flex flex-col items-center text-center mt-16">
        <h2 className="text-3xl font-bold">
          Welcome to the Missing Persons Database
        </h2>
        <p className="mt-4 ">
          A comprehensive resource to help view a missing person's status.
        </p>
        <Link href="/table">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white  rounded-lg text-lg hover:bg-blue-700 transition">
            View Database
          </button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 pb-8">
        Missing Persons Database
      </footer>
    </div>
  );
}
