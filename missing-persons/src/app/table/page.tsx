import { useMemo } from "react";
import Link from "next/link";
import TableComponent from "../TableComponent"; // Adjust path if needed
import { sampleData } from "../data";

const TablePage = () => {
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "age", header: "Age" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "gender", header: "Gender" },
      { accessorKey: "dateMissing", header: "Date Missing" },
      { accessorKey: "lastLocation", header: "Last Location" },
    ],
    []
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Missing Persons Table</h1>
      
      {/* Back to Home Button */}
      <Link href="/">
        <button className="mb-4 px-6 py-2 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-600 transition">
          Home
        </button>
      </Link>

      <TableComponent columns={columns} data={sampleData} />
    </div>
  );
};

export default TablePage;
