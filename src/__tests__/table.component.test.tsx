import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { Table, createTableData } from "../components/Table/Table";
import { FileItem, FileStatus } from "../types/file.types";
import { useState } from "react";
import { TableToolbarSelectAll } from "../components/TableToolbar/TableToolbarSelectAll";
import { TableToolbarDownloader } from "../components/TableToolbar/TableToolbarDownloader";

import { columnDef } from "../components/FileViewComponent";

const testSampleData: FileItem[] = [
  {
    name: "one.exe",
    device: "DEVICE_ONE",
    path: "PATH_SAMPLE_ONE",
    status: FileStatus.Scheduled,
  },
  {
    name: "two.exe",
    device: "DEVICE_TWO",
    path: "PATH_SAMPLE_TWO",
    status: FileStatus.Available,
  },
  {
    name: "three.exe",
    device: "DEVICE_THREE",
    path: "PATH_SAMPLE_THREE",
    status: FileStatus.Available,
  },
];

const TableWithData = () => {
  const [tableData, setTableData] = useState(
    createTableData([...testSampleData]),
  );
  return (
    <Table
      columns={columnDef}
      tableData={tableData}
      setTableData={setTableData}
    />
  );
};

const TableWithDataAndToolbar = () => {
  const [tableData, setTableData] = useState(
    createTableData([...testSampleData]),
  );
  return (
    <>
      <div className="table-toolbar-root">
        <TableToolbarSelectAll
          tableData={tableData}
          setTableData={setTableData}
          totalRows={tableData.rows.length}
        ></TableToolbarSelectAll>
        <TableToolbarDownloader tableData={tableData} />
      </div>
      <Table
        columns={columnDef}
        tableData={tableData}
        setTableData={setTableData}
      />
    </>
  );
};

/*
· The select-all checkbox should be in an unselected state if no items are selected.
· The select-all checkbox should be in a selected state if all items are selected.
· The select-all checkbox should be in an indeterminate state if some but not all items are selected.
· The "Selected 2" text should reflect the count of selected items and display "None Selected" when there are none selected.
· Clicking the select-all checkbox should select all items if none or some are selected.
· Clicking the select-all checkbox should de-select all items if all are currently selected.
· Status should be correctly formatted
· Clicking "Download Selected" when some or all items are displayed should generate an alert box with the path and device of all selected files.
· Only those that have a status of "available" are currently able to be downloaded. Your implementation should manage this.
*/

test("Loads and displays the App", async () => {
  render(<App />);
  await screen.findByRole("banner");
  expect(screen.getByRole("banner")).toHaveTextContent("Super File World");
});

test("Loads and displays an empty Table component", async () => {
  render(
    <Table
      columns={[]}
      tableData={{
        rows: [],
        selected: {},
      }}
      setTableData={() => ""}
    />,
  );
  await screen.findByRole("heading");
  expect(screen.getByRole("heading")).toHaveTextContent("No data found");
});

test("Loads and displays a basic Table component", async () => {
  render(<TableWithData />);
  await screen.findByRole("table");
  await screen.findAllByRole("columnheader");
  await screen.findAllByRole("cell");

  expect(screen.getAllByRole("columnheader")).toHaveLength(6);
  expect(screen.getAllByRole("cell")).toHaveLength(18);
});

test("The select-all checkbox should be in an unselected state if no items are selected.", async () => {
  render(<TableWithDataAndToolbar />);
  await screen.findByTestId("table-toolbar-select-all-input");
  await screen.findByTestId("table-toolbar-select-all-label");

  expect(
    screen.getByTestId("table-toolbar-select-all-input"),
  ).not.toBeChecked();
  expect(
    screen.getByTestId("table-toolbar-select-all-label"),
  ).toHaveTextContent("None Selected");
});

test("The select-all checkbox should be in a selected state if all items are selected.", async () => {
  render(<TableWithDataAndToolbar />);
  await screen.findByRole("table");
  const table = screen.getByRole("table");
  const tableCheckboxes = within(table).getAllByRole("checkbox");

  for (const checkbox of tableCheckboxes) {
    fireEvent.click(checkbox);
  }
  expect(screen.getByTestId("table-toolbar-select-all-input")).toBeChecked();
  expect(
    screen.getByTestId("table-toolbar-select-all-label"),
  ).toHaveTextContent("Selected 3");
});

test("The select-all checkbox should be in an indeterminate state if some but not all items are selected.", async () => {
  render(<TableWithDataAndToolbar />);
  await screen.findByRole("table");
  const table = screen.getByRole("table");
  const tableCheckboxes = within(table).getAllByRole("checkbox");

  fireEvent.click(tableCheckboxes[0]);

  expect(
    screen.getByTestId("table-toolbar-select-all-input"),
  ).toBePartiallyChecked();
  expect(
    screen.getByTestId("table-toolbar-select-all-label"),
  ).toHaveTextContent("Selected 1");
});

test("The 'Selected 2' text should reflect the count of selected items and display 'None Selected' when there are none selected", async () => {
  render(<TableWithDataAndToolbar />);
  await screen.findByRole("table");
  const table = screen.getByRole("table");
  const tableCheckboxes = within(table).getAllByRole("checkbox");

  fireEvent.click(tableCheckboxes[0]);
  fireEvent.click(tableCheckboxes[1]);

  expect(
    screen.getByTestId("table-toolbar-select-all-label"),
  ).toHaveTextContent("Selected 2");

  fireEvent.click(tableCheckboxes[0]);
  fireEvent.click(tableCheckboxes[1]);

  expect(
    screen.getByTestId("table-toolbar-select-all-label"),
  ).toHaveTextContent("None Selected");
});

test("Clicking the select-all checkbox should select all items if none or some are selected", async () => {
  render(<TableWithDataAndToolbar />);
  await screen.findByRole("table");
  await screen.findByTestId("table-toolbar-select-all-input");

  const table = screen.getByRole("table");
  const tableCheckboxes = within(table).getAllByRole("checkbox");

  // Check all
  fireEvent.click(screen.getByTestId("table-toolbar-select-all-input"));
  tableCheckboxes.forEach((checkbox) => {
    expect(checkbox).toBeChecked();
  });

  // Uncheck all
  fireEvent.click(screen.getByTestId("table-toolbar-select-all-input"));
  tableCheckboxes.forEach((checkbox) => {
    expect(checkbox).not.toBeChecked();
  });

  // Check one, then Check all, this time using the label
  fireEvent.click(tableCheckboxes[0]);
  fireEvent.click(screen.getByTestId("table-toolbar-select-all-label"));
  tableCheckboxes.forEach((checkbox) => {
    expect(checkbox).toBeChecked();
  });
});

test("Status should be correctly formatted", async () => {
  render(<TableWithDataAndToolbar />);
  await screen.findAllByTestId("status-indicator");
  expect(screen.getAllByTestId("status-indicator")[0]).not.toHaveClass(
    "success",
  );
  expect(screen.getAllByTestId("status-indicator")[1]).toHaveClass("success");
  expect(screen.getAllByTestId("status-indicator")[2]).toHaveClass("success");
});

test("Clicking 'Download Selected' when some or all items are displayed should generate an alert box with the path and device of all selected files. Only those that have a status of 'available' are currently able to be downloaded.", async () => {
  render(<TableWithDataAndToolbar />);
  await screen.findByRole("table");
  await screen.findByTestId("table-toolbar-download-button");

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  fireEvent.click(screen.getByTestId("table-toolbar-select-all-input"));
  fireEvent.click(screen.getByTestId("table-toolbar-download-button"));
  expect(screen.getByRole("dialog")).toBeVisible();
  expect(screen.getByRole("dialog")).not.toHaveTextContent("PATH_SAMPLE_ONE");
  expect(screen.getByRole("dialog")).toHaveTextContent("PATH_SAMPLE_TWO");
  expect(screen.getByRole("dialog")).toHaveTextContent("PATH_SAMPLE_THREE");
});
