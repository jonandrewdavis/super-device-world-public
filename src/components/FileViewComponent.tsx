import { useState } from "react";

import { FileItem, FileStatus } from "../types/file.types";
import { Column } from "../types/table.types";

import { TableCell } from "./Table/TableCell";
import { Table, createTableData } from "./Table/Table";
import { TableToolbarDownloader } from "./TableToolbar/TableToolbarDownloader";
import { TableToolbarSelectAll } from "./TableToolbar/TableToolbarSelectAll";
import { TableToolbarAddRow } from "./TableToolbar/TableToolbarAddRow";

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

const sampleData: FileItem[] = [
  {
    name: "smss.exe",
    device: "Mario",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: FileStatus.Scheduled,
  },
  {
    name: "netsh.exe",
    device: "Luigi",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: FileStatus.Available,
  },
  {
    name: "uxtheme.dll",
    device: "Peach",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: FileStatus.Available,
  },
  {
    name: "aries.sys",
    device: "Daisy",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys",
    status: FileStatus.Scheduled,
  },

  {
    name: "cryptbase.dll",
    device: "Yoshi",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: FileStatus.Scheduled,
  },
  {
    name: "7za.exe",
    device: "Toad",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: FileStatus.Scheduled,
  },
];

// FileViewComponent is a "smart" component that handles data fetching and state.
// It knows about the FileItem type, but the components within are designed to be reusable with any type.
const FileViewComponent = () => {
  // The `createTableData` helper function prepares data for our table components.
  // It decorates the incoming data with uuids and sets up the `selected` hash map.
  // returns tableData: {rows, selected}. See `types/table.types.ts`.
  const [tableData, setTableData] = useState(createTableData([...sampleData]));

  return (
    <>
      <div className="table-toolbar-root">
        <TableToolbarSelectAll
          tableData={tableData}
          setTableData={setTableData}
          totalRows={tableData.rows.length}
        ></TableToolbarSelectAll>
        <TableToolbarDownloader tableData={tableData} />
        <TableToolbarAddRow setTableData={setTableData} />
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
