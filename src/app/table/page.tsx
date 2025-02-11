"use client"; // Use this because data fetching happens on the client-side
import { useState, useEffect } from "react";
import Link from "next/link";
import TableComponent from "../TableComponent";
import { fetchMissingPersons } from "../utils/fetch";

export default function TablePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const result = await fetchMissingPersons();
      setData(result);
    }
    loadData();
  }, []);

  

  const columns = [
      { accessorKey: "case_id", header: "ID" },
      { accessorKey: "first_name", header: "First Name"},
      { accessorKey: "last_name", header: "Last Name"},
      { accessorKey: "age", header: "Age" },
      { accessorKey: "gender", header: "Sex" },
      { accessorKey: "race", header: "Race / Ethnicity"},
      { accessorKey: "missing_date", header: "Date Missing" },
      { accessorKey: "missing_location", header: "City" },
      { accessorKey: "missing_county", header: "County"},
      { accessorKey: "missing_state", header: "State"},
      { accessorKey: "date_modified", header: "Date modified"},
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
