//Displays table with a persons data
'use client';
import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import TableComponent from '../TableComponent';
import { fetchMissingPersons } from '../utils/fetch';
import { MRT_ColumnDef } from 'material-react-table';
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { EditIcon } from 'lucide-react';
import FormDrawer from '@/utils/FormDrawer';
import DeleteIcon from '@mui/icons-material/Delete';

//Data layout for person
export type MissingPerson = {
  case_id: string;
  first_name: string;
  last_name: string;
  age: string;
  gender: string;
  race: string;
  missing_date: Date;
  city: string;
  county: string;
  date_modified: Date;
  tribes: string[];
  tribe_statuses: string[];
  classification: string;
  category_of_missing: string;
};

// Define a type for the session state
type SessionData = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  role?: string;
  expires?: string;
} | null;

export default function TablePage() {
  const [data, setData] = useState<MissingPerson[]>([]);
  const [session, setSession] = useState<SessionData>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<MissingPerson | null>(
    null
  );

  // Authentication and Modal/Dialog State from TableComponent
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = await fetchMissingPersons();
      const transformedData = result.map((person: any) => {
        const nameParts = person.name.split(' ');
        const last_name = nameParts[0];
        const first_name = nameParts.slice(1).join(' ');
        const [city, county, state] = person.missing_location
          .split(',')
          .map((item: string) => item.trim());
        const today = new Date().toISOString().split('T')[0];
        return {
          ...person,
          first_name,
          last_name,
          city,
          county,
          date_modified: today,
          classification: person.classification || 'N/A',
          category_of_missing: person.classification || 'N/A',
        };
      });
      setData(transformedData);
    }

    async function getSessionAndAuth() {
      try {
        // Fetch session
        const sessionRes = await fetch('/api/session');
        const sessionData = await sessionRes.json();
        setSession(sessionData);
        console.log('Session:', sessionData);

        // Fetch auth status
        const authResponse = await fetch('/api/auth');
        if (authResponse.ok) {
          const authData = await authResponse.json();
          setIsAuthenticated(authData.isAuthenticated);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching session or auth status:', error);
        setIsAuthenticated(false);
        setSession(null);
      }
    }

    loadData();
    getSessionAndAuth();
  }, []);

  // Handlers from TableComponent
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
      window.location.reload();
    } else {
      console.error('Login failed');
    }
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch('/api/logout', { method: 'POST' });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Logout failed');
        setIsLoggingOut(false);
        setOpenLogoutDialog(false);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
      setOpenLogoutDialog(false);
    }
  };

  const openDrawer = (person: MissingPerson | null = null) => {
    console.log('Opening Drawer with Person:', person);
    setSelectedPerson(person);
    setDrawerOpen(true);
  };

  const handleDelete = async (case_id: string) => {
  const confirmation = window.confirm("Are you sure you want to delete this person?");
  if (confirmation) {
    try {
      const response = await fetch('/api/deletePerson', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case_id }),
      });
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  }
};


  let columns: MRT_ColumnDef<MissingPerson>[] = [];

  if (session && session.role === 'admin') {
    columns = [
      {
        header: 'Edit',
        id: 'actions',
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <IconButton
            className="edit-button"
            onClick={(event) => {
              event.stopPropagation();
              console.log('Edit button clicked for:', row.original);
              openDrawer(row.original);
            }}>
            <EditIcon />
          </IconButton>
        ),
        size: 60,
      },
      { accessorKey: 'case_id', header: 'ID' },
      { accessorKey: 'first_name', header: 'First Name' },
      { accessorKey: 'last_name', header: 'Last Name' },
      { accessorKey: 'age', header: 'Age', filterVariant: 'range-slider' },
      { accessorKey: 'gender', header: 'Sex' },
      { accessorKey: 'race', header: 'Race / Ethnicity' },
      {
        accessorFn: (originalRow) => new Date(originalRow.missing_date),
        header: 'Date Missing',
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
        filterVariant: 'date-range',
      },
      { accessorKey: 'city', header: 'City' },
      { accessorKey: 'county', header: 'County' },

      {
        accessorKey: 'tribe_statuses',
        header: 'Tribal Statuses',
        Cell: ({ row }) => row.original.tribe_statuses?.join(', ') || 'N/A',
      },
      {
        accessorKey: 'tribes',
        header: 'Associated Tribes',
        Cell: ({ row }) => row.original.tribes?.join(', ') || 'N/A',
        filterVariant: 'select',
      },
      {
        accessorKey: 'classification',
        header: 'Category of Missing',
        Cell: ({ row }) => row.original.classification || 'N/A',
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.date_modified),
        header: 'Date modified',
        filterVariant: 'date-range',
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
      },
      {
        header: 'Delete',
        id: 'delete',
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <IconButton
            className="delete-button"
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(row.original.case_id); // Call the function to delete the person
            }}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ];
  } else {
    columns = [
      { accessorKey: 'case_id', header: 'ID' },
      { accessorKey: 'first_name', header: 'First Name' },
      { accessorKey: 'last_name', header: 'Last Name' },
      { accessorFn: (originalRow) => parseInt(originalRow.age), header: 'Age', filterVariant: 'range' },
      { accessorKey: 'gender', header: 'Sex' },
      { accessorKey: 'race', header: 'Race / Ethnicity' },
      {
        accessorFn: (originalRow) => new Date(originalRow.missing_date),
        header: 'Date Missing',
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
        filterVariant: 'date-range',
      },
      { accessorKey: 'city', header: 'City' },
      { accessorKey: 'county', header: 'County' },

      {
        accessorKey: 'tribe_statuses',
        header: 'Tribal Statuses',
        Cell: ({ row }) => row.original.tribe_statuses?.join(', ') || 'N/A',
      },
      {
        accessorKey: 'tribes',
        header: 'Associated Tribes',
        Cell: ({ row }) => row.original.tribes?.join(', ') || 'N/A',
        filterVariant: 'select',
      },
      {
        accessorKey: 'classification',
        header: 'Category of Missing',
        Cell: ({ row }) => row.original.classification || 'N/A',
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.date_modified),
        header: 'Date modified',
        filterVariant: 'date-range',
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
      },
    ];
  }

  return (
    <div className="p-6 h-full">
      <div className="flex justify-between items-center mb-4 gap-4">
        <Link href="/">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            size="medium"
            sx={{
              minWidth: '100px',
              backgroundColor: '#1976D2',
              '&:hover': { backgroundColor: '#1565C0' },
            }}>
            Back
          </Button>
        </Link>

        <h1 className="text-2xl font-bold text-center flex-grow">
          Missing Persons Table
        </h1>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {session && session.role === 'admin' && (
            <Button
              variant="contained"
              onClick={() => openDrawer()}
              startIcon={<AddIcon />}
              size="medium">
              Add Person
            </Button>
          )}
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
        </Box>
      </div>

      <div>
        <TableComponent columns={columns} data={data} />
      </div>

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
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Sign In
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
          sx={{ textAlign: 'center', pb: 1 }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent sx={{ pt: 0, pb: 1 }}>
          <DialogContentText
            id="logout-dialog-description"
            sx={{ textAlign: 'center' }}>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pt: 0, pb: 2 }}>
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

      <FormDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedPerson(null);
        }}
        initialData={selectedPerson || undefined}
      />
    </div>
  );
}
