"use client";

import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  useTheme,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { MissingPerson } from "./table/page";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";

type TableComponentProps = {
  columns: MRT_ColumnDef<MissingPerson>[];
  data: MissingPerson[];
};

const TableComponent = ({ columns, data }: TableComponentProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f0f9ff', // Light blue hover effect
        } 
      },
    }),
  });
  
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <Tooltip title="Profile">
          <IconButton size="large" onClick={handleClick}>
            <AccountCircleIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
          <MenuItem onClick={handleClose}>My Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
      <div className="shadow-md rounded-lg">
        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

export default TableComponent;