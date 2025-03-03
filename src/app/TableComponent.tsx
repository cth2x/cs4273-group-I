"use client";

import {
  createTheme,
  ThemeProvider,
  useMediaQuery,
  useTheme,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        setIsLoggingOut(false);
        setOpenLogoutDialog(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
      setOpenLogoutDialog(false);
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
      minSize: 20,
      maxSize: 9001,
      size: 40,
    },
    muiTableBodyProps: {
      sx: {
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
          backgroundColor: "#f0f9ff",
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
          onClick={handleLogoutClick}
          size="medium">
          Logout
        </Button>
      </div>

      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description">
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out? You will still be able to view the
            table, but you won't be able to make any changes until you log in
            again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            color="error"
            variant="contained"
            disabled={isLoggingOut}>
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </DialogActions>
      </Dialog>

      <div className="shadow-md rounded-lg">
        <MaterialReactTable table={table} />
      </div>
    </>
  );
};

export default TableComponent;
