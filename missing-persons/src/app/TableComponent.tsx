"use client";

import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";

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
  return (
    <>
      <MaterialReactTable columns={columns} data={data} />
    </>
  );
};

export default TableComponent;
