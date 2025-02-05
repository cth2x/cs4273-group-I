"use client";

import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

type DataType = {
  id: number;
  name: string;
  email: string;
};

type TableComponentProps = {
  columns: MRT_ColumnDef<DataType>[];
  data: DataType[];
};

const TableComponent = ({ columns, data }: TableComponentProps) => {
  const globalTheme = useTheme();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          background: {
            default: prefersDarkMode ? "#121212" : "#ffffff", // Dark gray for dark mode, white for light mode
            paper: prefersDarkMode ? "#1e1e1e" : "#f8f9fa", // Slightly lighter background for cards/tables
          },
          text: {
            primary: prefersDarkMode ? "#ffffff" : "#000000",
            secondary: prefersDarkMode ? "#b0b0b0" : "#444444",
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={tableTheme}>
      <div className="shadow-md rounded-lg">
        <MaterialReactTable
          columns={columns}
          data={data}
          enableRowSelection
          enableColumnOrdering
          enableColumnPinning
        />
      </div>
    </ThemeProvider>
  );
  //   return (
  //     <div className="shadow-md bg-white dark:bg-gray-900 text-black dark:text-white">
  //       <MaterialReactTable columns={columns} data={data} />
  //     </div>
  //   );
};

export default TableComponent;
