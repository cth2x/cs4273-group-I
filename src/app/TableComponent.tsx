"use client";

import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  useTheme,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { MissingPerson } from "./table/page";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";

type TableComponentProps = {
  columns: MRT_ColumnDef<MissingPerson>[];
  data: MissingPerson[];
};

const TableComponent = ({ columns, data }: TableComponentProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleRowClick = (row: any) => {
    router.push(`/profile/${row.original.case_id}`);
  };

  const table = useMaterialReactTable({
    columns,
    id: "missing-persons-table",
    enableColumnOrdering: true,
    enableColumnPinning: true,
    data,
    defaultColumn: {
      minSize: 20, //allow columns to get smaller than default
      maxSize: 9001, //allow columns to get larger than default
      size: 40, //make columns wider by default
    },
    // Get rid of this to drop the stripes on the table
    muiTableBodyProps: {
      sx: {
        //stripe the rows, make odd rows a darker color
        "& tr:nth-of-type(odd) > td": {
          backgroundColor: "#f5f5f5",
        },
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleRowClick(row),
      sx: {
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f0f9ff", // Light blue hover effect
        },
      },
    }),
  });

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="contained"
          color="primary"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          size="medium">
          Logout
        </Button>
      </div>
      <div className="shadow-md rounded-lg">
        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

export default TableComponent;
