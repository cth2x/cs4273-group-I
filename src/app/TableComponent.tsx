//Table layout
'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useRouter } from 'next/navigation';
import { MissingPerson } from './table/page';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type TableComponentProps = {
  columns: MRT_ColumnDef<MissingPerson>[];
  data: MissingPerson[];
};

const TableComponent = ({ columns, data }: TableComponentProps) => {
  const router = useRouter();

  const handleRowClick = (row: any) => {
    router.push(`/profile/${row.original.case_id}`);
  };

  const table = useMaterialReactTable({
    columns,
    id: 'missing-persons-table',
    enableColumnOrdering: true,
    enableColumnPinning: true,
    enableColumnActions: false,
    enableColumnDragging: false,
    data,
    defaultColumn: {
      minSize: 20,
      maxSize: 9001,
      size: 40,
    },
    initialState: { columnPinning: { left: ['actions'] } },
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

  return (
    <>
      <div className="shadow-md rounded-lg">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MaterialReactTable table={table} />
        </LocalizationProvider>
      </div>
    </>
  );
};

export default TableComponent;
