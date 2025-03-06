'use client';

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
  Box,
} from '@mui/material';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFullScreenButton,
  MRT_ToolbarInternalButtons,
  useMaterialReactTable,
} from 'material-react-table';
import { useMemo, useState, useEffect } from 'react';
import { MissingPerson } from './table/page';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import DownloadIcon from '@mui/icons-material/Download';
import { useRouter } from 'next/navigation';
import FormDrawer from './utils/FormDrawer';
import { FormEvent } from 'react';

type TableComponentProps = {
  columns: MRT_ColumnDef<MissingPerson>[];
  data: MissingPerson[];
};

const TableComponent = ({ columns, data }: TableComponentProps) => {
  const router = useRouter();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth');
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.isAuthenticated);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/login', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setShowLoginModal(false);
      setIsAuthenticated(true);
    }
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setIsLoggingOut(false);
        setOpenLogoutDialog(false);
        // Update authentication state instead of redirecting
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
      setOpenLogoutDialog(false);
    }
  };

  const handleRowClick = (row: any) => {
    router.push(`/profile/${row.original.case_id}`);
  };

  const table = useMaterialReactTable({
    columns,
    id: 'missing-persons-table',
    enableColumnOrdering: true,
    enableColumnPinning: true,
    // enableRowActions: true,
    enableColumnActions: false,
    enableColumnDragging: false,
    data,
    defaultColumn: {
      minSize: 20,
      maxSize: 9001,
      size: 40,
    },
    initialState: { columnPinning: { left: ['actions'] } },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {/* Add Missing Person button */}
        <Button variant="contained" onClick={() => openDrawer()}>
          Add Missing Person
        </Button>

        {/* Export to CSV button */}
        <Button
          variant="outlined"
          color="primary"
          onClick={exportToCSV}
          startIcon={<DownloadIcon />}>
          Export CSV
        </Button>
      </Box>
    ),
    muiTableBodyProps: {
      sx: {
        '& tr:nth-of-type(odd) > td': {
          backgroundColor: '#f5f5f5',
        },
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleRowClick(row),
      sx: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f0f9ff',
        },
      },
    }),
  });

  // Function to export table data to CSV
  const exportToCSV = () => {
    // Get visible columns
    const visibleColumns = table.getVisibleLeafColumns().map((column) => {
      return {
        id: column.id,
        header: column.columnDef.header?.toString() || column.id,
      };
    });

    // Create CSV header row
    const headerRow = visibleColumns
      .map((column) => `"${column.header}"`)
      .join(',');

    // Create CSV data rows
    const dataRows = data.map((row) => {
      return visibleColumns
        .map((column) => {
          const cellValue = row[column.id as keyof MissingPerson];
          // Handle different data types and escape quotes
          return `"${cellValue?.toString().replace(/"/g, '""') || ''}"`;
        })
        .join(',');
    });

    // Combine header and data rows
    const csvContent = [headerRow, ...dataRows].join('\n');

    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'missing_persons_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = (person: MissingPerson | null = null) => {
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        {isAuthenticated ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<LogoutIcon />}
            onClick={handleLogoutClick}
            size="medium"
            sx={{ minWidth: '100px' }}>
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            onClick={handleLoginClick}
            size="medium"
            sx={{ minWidth: '100px' }}>
            Admin Login
          </Button>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Admin Login</h3>
              <button
                onClick={handleCloseLoginModal}
                className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Admin Sign In
              </button>
            </form>
          </div>
        </div>
      )}

      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description">
        <DialogTitle
          id="logout-dialog-title"
          sx={{ textAlign: 'center', paddingBottom: 1 }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent sx={{ paddingTop: 0, paddingBottom: 1 }}>
          <DialogContentText
            id="logout-dialog-description"
            sx={{ textAlign: 'center' }}>
            Are you sure you want to log out? You will still be able to view the
            table, but you won't be able to make any changes until you log in
            again.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: 'center', paddingTop: 0, paddingBottom: 2 }}>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            color="error"
            variant="contained"
            disabled={isLoggingOut}>
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </DialogActions>
      </Dialog>

      <div className="shadow-md rounded-lg">
        <MaterialReactTable table={table} />
      </div>

      <FormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        initialData={undefined}
      />
    </>
  );
};

export default TableComponent;
