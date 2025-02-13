"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative">
      {/* Login Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowLoginModal(true)}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition">
          Login
        </button>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Login</h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}

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
