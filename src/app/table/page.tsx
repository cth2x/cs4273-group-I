'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import TableComponent from '../TableComponent';
import { fetchMissingPersons } from '../utils/fetch';
import { MRT_ColumnDef } from 'material-react-table';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EditIcon } from 'lucide-react';
import FormDrawer from '@/utils/FormDrawer';


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

export default function TablePage() {
  const [data, setData] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function loadData() {
      const result = await fetchMissingPersons();

      // Transform data: Split "name" into "first_name" and "last_name"
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

    async function getSession() {
      const res = await fetch('/api/session');
      const data = await res.json();
      setSession(data);
      console.log("Session:", data);
    }

    loadData();
    getSession();
  }, []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<MissingPerson | null>(
    null
  );

  // Open drawer here is causing some errors:
  const openDrawer = (person: MissingPerson | null = null) => {
    console.log('Opening Drawer with Person:', person); // Debugging log
    setSelectedPerson(person);
    setDrawerOpen(true);
  };



  let columns: MRT_ColumnDef<MissingPerson>[];
  
  if (session && session.role === 'admin') {
    columns = [
    // Make this only show up for admin
    {
      header: 'Edit',
      id: 'actions',
      enableSorting: false,
      enableColumnFilter: false,
      Cell: ({ row }) => (
        <IconButton
          className="edit-button"
          onClick={(event) => {
            event.stopPropagation(); // Prevent row click behavior (if re-added later)
            console.log('Edit button clicked for:', row.original); // Debugging log
            openDrawer(row.original);
          }}>
          <EditIcon />
        </IconButton>
      ),
    },
    { accessorKey: 'case_id', header: 'ID' },
    { accessorKey: 'first_name', header: 'First Name' },
    { accessorKey: 'last_name', header: 'Last Name' },
    { accessorKey: 'age', header: 'Age', filterVariant: 'range-slider'},
    { accessorKey: 'gender', header: 'Sex' },
    { accessorKey: 'race', header: 'Race / Ethnicity' },
    {
      accessorFn: (originalRow) => new Date(originalRow.missing_date),
      header: 'Date Missing',
      Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
      filterVariant: 'date-range'
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
      filterVariant: 'date-range' ,
      Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString()
    }
    ];
  } else {
    columns = [
      { accessorKey: 'case_id', header: 'ID' },
      { accessorKey: 'first_name', header: 'First Name' },
      { accessorKey: 'last_name', header: 'Last Name' },
      { accessorKey: 'age', header: 'Age', filterVariant: 'range-slider'},
      { accessorKey: 'gender', header: 'Sex' },
      { accessorKey: 'race', header: 'Race / Ethnicity' },
      {
	accessorFn: (originalRow) => new Date(originalRow.missing_date),
	header: 'Date Missing',
	Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
	filterVariant: 'date-range'
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
	filterVariant: 'date-range' ,
	Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString()
      }
    ];
  }
  
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
              minWidth: '100px',
              backgroundColor: '#1976D2',
              '&:hover': { backgroundColor: '#1565C0' },
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

      <FormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        initialData={selectedPerson || undefined}></FormDrawer>
    </div>
  );
}
