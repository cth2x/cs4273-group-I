"use client"; // Use this because data fetching happens on the client-side
import { useState, useEffect } from "react";
import Link from "next/link";
import TableComponent from "../TableComponent";
import { fetchMissingPersons } from "../utils/fetch";
import { MRT_ColumnDef } from "material-react-table";

export type MissingPerson = {
  case_id: string;
  first_name: string;
  last_name: string;
  age: string;
  gender: string;
  race: string;
  missing_date: string;
  city: string;
  county: string;
  state: string;
  date_modified: string;
};

export default function TablePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const result = await fetchMissingPersons();

      // Transform data: Split "name" into "first_name" and "last_name"
      const transformedData = result.map((person: any) => {
        const [first_name, ...last_name] = person.name.split(" "); // Split at the first space
        const [city, county, state] = person.missing_location
          .split(",")
          .map((item: string) => item.trim());
        const today = new Date().toISOString().split("T")[0];
        return {
          ...person,
          first_name,
          last_name: last_name.join(" "), // Join the remaining parts in case of multiple last names
          city,
          county,
          state,
          date_modified: today, //Update and add this field in db later instead of using hardcoded date
        };
      });

      setData(transformedData);
    }

    loadData();
  }, []);

  const columns: MRT_ColumnDef<MissingPerson>[] = [
    { accessorKey: "case_id", header: "ID" },
    { accessorKey: "first_name", header: "First Name" },
    { accessorKey: "last_name", header: "Last Name" },
    { accessorKey: "age", header: "Age" },
    { accessorKey: "gender", header: "Sex" },
    { accessorKey: "race", header: "Race / Ethnicity" },
    // Search isn't working for date_missing yet, fix later
    {
      accessorKey: "missing_date",
      header: "Date Missing",
      Cell: ({ row }) =>
        new Date(row.original.missing_date).toISOString().split("T")[0],
    },
    { accessorKey: "city", header: "City" },
    { accessorKey: "county", header: "County" },
    { accessorKey: "state", header: "State" },
    { accessorKey: "tribal_affiliation", header: "Tribal Affiliation/Enrollment"},
    { accessorKey: "associated_tribes", header: "Associated Tribes"}, 
    { accessorKey: "date_modified", header: "Date modified" },
  ];

  return (
    <div className="p-6 h-full">
      <h1 className="text-2xl font-bold mb-4">Missing Persons Table</h1>

      <Link href="/">
        <button className="mb-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
          Back to Home
        </button>
      </Link>

      <TableComponent columns={columns} data={data} />
    </div>
  );
}
