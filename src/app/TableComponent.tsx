"use client";

import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
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
  return (
    <div className="shadow-md rounded-lg">
      <MaterialReactTable
        id="missing-persons-table"
        columns={columns}
        data={data}
        enableRowSelection
        enableColumnOrdering
        enableColumnPinning
      />
    </div>
  );
  //   return (
  //     <div className="shadow-md bg-white dark:bg-gray-900 text-black dark:text-white">
  //       <MaterialReactTable columns={columns} data={data} />
  //     </div>
  //   );
};

export default TableComponent;
