"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MissingPerson } from "../../table/page";
import { fetchMissingPersons } from "../../utils/fetch";

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
          const [first_name, ...last_name] = p.name.split(" ");
          const [city, county, state] = p.missing_location
            .split(",")
            .map((item: string) => item.trim());
          
          return {
            ...p,
            first_name,
            last_name: last_name.join(" "),
            city,
            county,
            state,
            date_modified: new Date().toISOString().split("T")[0],
          };
        });

        // Find the specific person by case_id
        const foundPerson = transformedData.find(
          (p: MissingPerson) => p.case_id === params.id
        );

        if (foundPerson) {
          setPerson(foundPerson);
        } else {
          console.error("Person not found");
        }
      } catch (error) {
        console.error("Error loading person data:", error);
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
          <h1 className="text-2xl font-bold text-red-600 mb-4">Person Not Found</h1>
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
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header with name and case ID */}
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              {person.first_name} {person.last_name}
            </h1>
            <div className="text-right">
              <div className="text-sm opacity-90">Case ID</div>
              <div className="text-xl font-mono">{person.case_id}</div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6">
          {/* Back button */}
          <Link href="/table">
            <button className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center">
              <span>← Back to Table</span>
            </button>
          </Link>

          {/* Profile content in a grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - basic details */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                Personal Information
              </h2>
              
              <div className="space-y-3">
                <InfoItem label="Age" value={person.age} />
                <InfoItem label="Gender" value={person.gender} />
                <InfoItem label="Race/Ethnicity" value={person.race} />
                {/* {person.tribal_affiliation && (
                  <InfoItem label="Tribal Affiliation" value={person.tribal_affiliation} />
                )}
                {person.associated_tribes && (
                  <InfoItem label="Associated Tribes" value={person.associated_tribes} />
                )} */}
              </div>
            </div>

            {/* Right column - location details */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                Location Information
              </h2>
              
              <div className="space-y-3">
                <InfoItem 
                  label="Missing Since" 
                  value={new Date(person.missing_date).toLocaleDateString()} 
                />
                <InfoItem label="City" value={person.city} />
                <InfoItem label="County" value={person.county} />
                <InfoItem label="State" value={person.state} />
                <InfoItem 
                  label="Last Updated" 
                  value={new Date(person.date_modified).toLocaleDateString()} 
                />
              </div>
            </div>
          </div>

          {/* Additional information section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Additional Information
            </h2>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700">
                This information is maintained by the Missing Persons Database. If you have any information 
                regarding this person, please contact your local authorities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for displaying information items
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-gray-600 font-medium">{label}:</span>{" "}
      <span className="text-gray-900">{value || "N/A"}</span>
    </div>
  );
}