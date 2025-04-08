//Homepage Display
'use client';
import Link from 'next/link';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const router = useRouter();
  const [stats, setStats] = useState<{ totalCases: number } | null>(null);
  
  // Search form state
  const [searchParams, setSearchParams] = useState({
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
    race: '',
    city: '',
    county: '',
    missing_date_from: '',
    missing_date_to: '',
    classification: '',
    tribe: ''
  });

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

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  // Handle search submission
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    
    // Filter out empty values
    const queryParams = Object.entries(searchParams)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    // Navigate to table page with search params
    router.push(`/table?${queryParams}`);
  };

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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative bg-gradient-to-br from-gray-50 to-blue-100">
      {/*Login Modal*/}
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
      <main className="flex flex-col items-center text-center py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to the Missing Persons Database
        </h2>
        <p className="mt-2 text-lg md:text-xl text-gray-600 mb-8">
          A comprehensive resource to help view a missing person's status.
        </p>

        {/* Search Toggle Button */}
        <button 
          onClick={() => setShowSearchForm(!showSearchForm)}
          className="px-8 py-3 mb-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition shadow-md font-semibold"
        >
          {showSearchForm ? 'Hide Search Form' : 'Search Missing Persons'}
        </button>

        {/* Search Form */}
        {showSearchForm && (
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Search Missing Persons</h3>
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={searchParams.first_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={searchParams.last_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={searchParams.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={searchParams.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Any</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Race/Ethnicity</label>
                <input
                  type="text"
                  name="race"
                  value={searchParams.race}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={searchParams.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                <input
                  type="text"
                  name="county"
                  value={searchParams.county}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Missing Date (From)</label>
                <input
                  type="date"
                  name="missing_date_from"
                  value={searchParams.missing_date_from}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Missing Date (To)</label>
                <input
                  type="date"
                  name="missing_date_to"
                  value={searchParams.missing_date_to}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category of Missing</label>
                <input
                  type="text"
                  name="classification"
                  value={searchParams.classification}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Associated Tribe</label>
                <input
                  type="text"
                  name="tribe"
                  value={searchParams.tribe}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="md:col-span-2 mt-2">
                <button 
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        )}

        {/* General Stats*/}
        <div className="mt-6 p-6 bg-white rounded-lg shadow-md border border-gray-200 min-w-[300px]">
          {stats ? (
            <p className="text-xl font-semibold text-gray-700">
              Currently Tracking:{' '}
              <span className="text-blue-600 text-xl">{stats.totalCases}</span>{' '}
              Active Cases
            </p>
          ) : (
            <p className="text-lg text-gray-500">Loading statistics...</p>
          )}
        </div>
        
        
        {/* Stats Section */}
        <div className="mt-10 w-full max-w-4xl bg-blue-600 text-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Missing Persons Column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Missing Persons</h3>
              <div className="mb-4">
                <p className="text-4xl font-bold">25,000+</p>
                <p className="text-sm opacity-80">Open Cases</p>
              </div>
              <div>
                <p className="text-4xl font-bold">56,000+</p>
                <p className="text-sm opacity-80">Resolved Cases</p>
              </div>
            </div>

        {/* Unidentified Persons Column */}
        <div>
              <h3 className="text-xl font-semibold mb-4">
                Unidentified Persons
              </h3>
              <div className="mb-4">
                <p className="text-4xl font-bold">15,000+</p>
                <p className="text-sm opacity-80">Open Cases</p>
              </div>
              <div>
                <p className="text-4xl font-bold">8,000+</p>
                <p className="text-sm opacity-80">Resolved Cases</p>
              </div>
            </div>

            {/* Unclaimed Persons Column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Unclaimed Persons</h3>
              <div className="mb-4">
                <p className="text-4xl font-bold">19,000+</p>
                <p className="text-sm opacity-80">Open Cases</p>
              </div>
              <div>
                <p className="text-4xl font-bold">6,000+</p>
                <p className="text-sm opacity-80">Resolved Cases</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-10">
          <Link href="/table">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition shadow-md font-semibold w-full sm:w-auto">
              View Database
            </button>
          </Link>
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-8 py-3 bg-gray-800 text-white rounded-lg text-lg hover:bg-gray-900 transition shadow-md font-semibold w-full sm:w-auto">
            Admin Login
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 text-gray-500">
        Missing Persons Database
      </footer>
    </div>
  );
}