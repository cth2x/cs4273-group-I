"use client";

import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { MissingPerson } from "./table/page";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type TableComponentProps = {
  columns: MRT_ColumnDef<MissingPerson>[];
  data: MissingPerson[];
};

const TableComponent = ({ columns, data }: TableComponentProps) => {
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
  });
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <Tooltip title="Profile">
          <IconButton size="large">
            <AccountCircleIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Tooltip>
      </div>
      <div className="shadow-md rounded-lg">
        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

export default TableComponent;
