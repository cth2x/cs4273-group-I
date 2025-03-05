"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import TableComponent from "../TableComponent";
import { fetchMissingPersons } from "../utils/fetch";
import { MRT_ColumnDef } from "material-react-table";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  tribes: string[];
  tribe_statuses: string[];
};

export default function TablePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const result = await fetchMissingPersons();

      // Transform data: Split "name" into "first_name" and "last_name"
      const transformedData = result.map((person: any) => {
        const [first_name, ...last_name] = person.name.split(" ");
        const [city, county, state] = person.missing_location
          .split(",")
          .map((item: string) => item.trim());
        const today = new Date().toISOString().split("T")[0];
        return {
          ...person,
          first_name,
          last_name: last_name.join(" "),
          city,
          county,
          state,
          date_modified: today,
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
    {
      accessorKey: "missing_date",
      header: "Date Missing",
      Cell: ({ row }) =>
        new Date(row.original.missing_date).toISOString().split("T")[0],
    },
    { accessorKey: "city", header: "City" },
    { accessorKey: "county", header: "County" },
    { accessorKey: "state", header: "State" },
    {
      accessorKey: "tribe_statuses",
      header: "Tribal Statuses",
      Cell: ({ row }) => row.original.tribe_statuses?.join(", ") || "N/A"
    },
    {
      accessorKey: "tribes",
      header: "Associated Tribes",
      Cell: ({ row }) => row.original.tribes?.join(", ") || "N/A"
    },
    { accessorKey: "date_modified", header: "Date modified" },
  ];

  return (
    <div className="p-6 h-full ">
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            size="medium"
            sx={{
              minWidth: "100px",
              backgroundColor: "#1976D2",
              "&:hover": { backgroundColor: "#1565C0" },
            }}>
            Back
          </Button>
        </Link>
      </div>

      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <h1 className="text-2xl font-bold">Missing Persons Table</h1>
      </div>

      <div className="pt-16">
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  );
}