//Displays persons profile page and data
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MissingPerson } from '../../table/page';
import { fetchMissingPersons } from '../../utils/fetch';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [person, setPerson] = useState<MissingPerson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPersonData() {
      setLoading(true);
      try {
        const allPersons = await fetchMissingPersons();

        // Transform data similar to table page
        const transformedData = allPersons.map((p: any) => {
          const nameParts = p.name.split(' ');
          const last_name = nameParts[0];
          const first_name = nameParts.slice(1).join(' ');
          const [city, county, state] = p.missing_location
            .split(',')
            .map((item: string) => item.trim());

          return {
            ...p,
            first_name,
            last_name,
            city,
            county,
            state,
            date_modified: new Date().toISOString().split('T')[0],
            classification: p.classification || 'N/A',
            category_of_missing: p.classification || 'N/A',
          };
        });

        // Find the specific person by case_id
        const foundPerson = transformedData.find(
          (p: MissingPerson) => p.case_id === params.id
        );

        if (foundPerson) {
          setPerson(foundPerson);
        } else {
          console.error('Person not found');
        }
      } catch (error) {
        console.error('Error loading person data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadPersonData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Person Not Found
          </h1>
          <p>The requested profile could not be found.</p>
          <Link href="/table">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Return to Table
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header with profile picture, name, and case ID */}
        <div className="bg-blue-600 p-8 text-white flex items-center">
          {/* Square placeholder for profile picture */}
          <div className="w-28 h-28 bg-gray-300 rounded-md mr-6 flex items-center justify-center text-sm text-gray-600">
            Profile Pic
          </div>

          {/* Name and case ID */}
          <div className="flex-grow">
            <h1 className="text-4xl font-bold">
              {person.first_name} {person.last_name}
            </h1>
          </div>

          <div className="text-right">
            <div className="text-lg opacity-90">Case ID</div>
            <div className="text-2xl font-mono">{person.case_id}</div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-8">
          {/* Back button */}
          <Link href="/table">
            <button className="mb-8 px-5 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center">
              <span>← Back to Table</span>
            </button>
          </Link>

          {/* Profile content in a grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column - basic details */}
            <div>
              <h2 className="text-2xl font-semibold mb-5 text-gray-800 border-b pb-3">
                Personal Information
              </h2>

              <div className="space-y-4">
                <InfoItem label="Age" value={person.age} />
                <InfoItem label="Gender" value={person.gender} />
                <InfoItem label="Race/Ethnicity" value={person.race} />
                <InfoItem
                  label="Category of Missing"
                  value={person.category_of_missing}
                />
              </div>
            </div>

            {/* Tribal Information column */}
            <div>
              <h2 className="text-2xl font-semibold mb-5 text-gray-800 border-b pb-3">
                Tribal Information
              </h2>
              <div className="space-y-4">
                <MultiInfoItem
                  label="Tribal Statuses"
                  values={person.tribe_statuses || []}
                />
                <MultiInfoItem
                  label="Associated Tribes"
                  values={person.tribes || []}
                />
              </div>
            </div>

            {/* Right column - location details */}
            <div>
              <h2 className="text-2xl font-semibold mb-5 text-gray-800 border-b pb-3">
                Location Information
              </h2>

              <div className="space-y-4">
                <InfoItem
                  label="Missing Since"
                  value={new Date(person.missing_date).toLocaleDateString()}
                />
                <InfoItem label="Missing Location" value={person.missing_location} />
                <InfoItem
                  label="Last Updated"
                  value={new Date(person.date_modified).toLocaleDateString()}
                />
              </div>
            </div>
          </div>

          {/* Additional information section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800 border-b pb-3">
              Additional Information
            </h2>

            <div className="bg-gray-100 p-5 rounded-lg">
              <p className="text-gray-700 text-lg">
                This information is maintained by the Missing Persons Database.
                If you have any information regarding this person, please
                contact your local authorities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for displaying single information items
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-gray-600 font-medium">{label}:</span>{' '}
      <span className="text-gray-900">{value || 'N/A'}</span>
    </div>
  );
}

// Helper component for displaying multiple information items
function MultiInfoItem({ label, values }: { label: string; values: string[] }) {
  return (
    <div>
      <span className="text-gray-600 font-medium">{label}:</span>{' '}
      <span className="text-gray-900">
        {values.length > 0 ? values.join(', ') : 'N/A'}
      </span>
    </div>
  );
}
