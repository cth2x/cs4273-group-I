import { useMemo } from "react";
import TableComponent from "./TableComponent"; // Adjust path as necessary
import { sampleData } from "./data";

const SamplePage = () => {
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

  return <TableComponent columns={columns} data={sampleData} />;
};

export default SamplePage;
