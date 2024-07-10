import { useEffect, useState } from "react";

import { FileItem, FileStatus } from "../types/file.types";
import { Column } from "../types/table.types";

import { TableCell } from "./Table/TableCell";
import { Table, createTableData } from "./Table/Table";
import { TableToolbarDownloader } from "./TableToolbar/TableToolbarDownloader";
import { TableToolbarSelectAll } from "./TableToolbar/TableToolbarSelectAll";
import { TableToolbarAddRow } from "./TableToolbar/TableToolbarAddRow";
import { fetchItems, useSubscription } from "../db/supabase";
import { TableToolbarDeleteSelected } from "./TableToolbar/TableToolbarDeleteSelected";

export const columnDef: Column<FileItem>[] = [
  {
    header: "",
    accessor: "selected",
  },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Device",
    accessor: "device",
  },
  {
    header: "Path",
    accessor: "path",
  },
  {
    header: "",
    accessor: "status",
    renderCell: (row) => {
      const isAvailable = row.status === FileStatus.Available;
      return (
        <TableCell row={row} key={`table-cell-status-${row.id}`}>
          <span
            aria-label={`Status Indicator: ${row.status}`}
            aria-hidden={!isAvailable}
            className={isAvailable ? "status success" : "status"}
            data-testid="status-indicator"
          ></span>
        </TableCell>
      );
    },
  },
  {
    header: "Status",
    accessor: "status",
    renderCell: (row) => (
      <TableCell
        row={row}
        key={`table-cell-status-text-${row.id}`}
        style={{ textTransform: "capitalize" }}
      >
        {row.status}
      </TableCell>
    ),
  },
];

// FileViewComponent is a "smart" component that handles data fetching and state.
// It knows about the FileItem type, but the components within are designed to be reusable with any type.
const FileViewComponent = () => {
  // The `createTableData` helper function prepares data for our table components.
  // It decorates the incoming data with uuids and sets up the `selected` hash map.
  // returns tableData: {rows, selected}. See `types/table.types.ts`.
  const [tableData, setTableData] = useState(createTableData([] as FileItem[]));
  const [tableError, setTableError] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  // TODO: use TanStack to do optimistic updates, etc, instead of refetch policy here
  useSubscription(({ errors, new: newData }) => {
    if (errors) {
      setTableError("Error refreshing from source");
    }
    if (newData) {
      fetchInitialData();
    }
  });

  async function fetchInitialData() {
    const { data, error } = await fetchItems();
    if (error) {
      setTableError(error.message);
    }

    if (data) {
      setTableData(createTableData(data as FileItem[]));
    }
  }
  if (tableError) {
    return (
      <>
        <div>
          <pre>{JSON.stringify(tableError, null, 2)}</pre>
        </div>
        <Table
          columns={columnDef}
          tableData={tableData}
          setTableData={setTableData}
        />
      </>
    );
  }

  return (
    <>
      <div className="table-toolbar-root">
        <TableToolbarSelectAll
          tableData={tableData}
          setTableData={setTableData}
          totalRows={tableData.rows.length}
        ></TableToolbarSelectAll>
        <TableToolbarDownloader tableData={tableData} />
        <TableToolbarAddRow />
        <TableToolbarDeleteSelected {...tableData} />
      </div>
      <Table
        columns={columnDef}
        tableData={tableData}
        setTableData={setTableData}
      />
    </>
  );
};

export default FileViewComponent;
