"use client";

import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";

type MissingPersonType = {
  id: string;
  date_missing: string;
  last_name: string;
  first_name: string;
  age: string;
  missing_city: string;
  missing_county: string;
  missing_state: string;
  sex: string;
  race_ethnicity: string;
  date_modified: string;
};

type TableComponentProps = {
  columns: MRT_ColumnDef<MissingPersonType>[];
  data: MissingPersonType[];
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
      size: 100, //make columns wider by default
    },
  });
  return (
    <div className="shadow-md rounded-lg">
      <MaterialReactTable table={table} />
    </div>
  );
};

export default TableComponent;
