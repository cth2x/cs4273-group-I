//Homepage Display
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const [stats, setStats] = useState<{ totalCases: number } | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error('Failed to fetch stats');
          setStats({ totalCases: 0 });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats({ totalCases: 0 });
      }
    }

    fetchStats();
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/login', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      router.push('/table');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative">
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Admin Login</h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <form className="space-y-4" onSubmit={login}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
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

        {/* General Stats */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
          {stats ? (
            <p className="text-lg font-semibold text-gray-700">
              Currently Tracking:{' '}
              <span className="text-blue-600 text-xl">{stats.totalCases}</span>{' '}
              Active Cases
            </p>
          ) : (
            <p className="text-lg text-gray-500">Loading statistics...</p>
          )}
        </div>

        <div className="flex space-x-4 mt-8">
          <Link href="/table">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition shadow-md font-semibold">
              View Database
            </button>
          </Link>
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-6 py-3 bg-black text-white rounded-lg text-lg hover:bg-gray-800 transition shadow-md font-semibold">
            Admin Login
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 pb-8">
        Missing Persons Database
      </footer>
    </div>
  );
}
