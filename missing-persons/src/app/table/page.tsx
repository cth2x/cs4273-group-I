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
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "age", header: "Age" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "gender", header: "Gender" },
    { accessorKey: "dateMissing", header: "Date Missing" },
    { accessorKey: "lastLocation", header: "Last Location" },
  ];

  return (
    <div className="p-6">
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
