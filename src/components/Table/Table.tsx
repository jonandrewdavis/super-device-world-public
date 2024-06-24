import { ChangeEvent } from "react";
import { Column, TableDataModel, TableRowModel } from "../../types/table.types";
import { TableCheckbox } from "./TableCheckbox";
import { UUID } from "../../types/table.types";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";

// TableProps accepts a generic parameter <T>.
// For example, T could be a "Report" type instead of the "FileItem" type.
export type TableProps<T> = {
  columns: Column<TableRowModel<T>>[];
  tableData: TableDataModel<T>;
  setTableData: React.Dispatch<React.SetStateAction<TableDataModel<T>>>;
};

// Helper to decorate given data with properties required to track tableState.
// Constrains the incoming type to at least have a "name" (for accessibility).
// Also adds the "id" property using built in randomUUID (for selecting).
export const createTableData = <T extends { name: string }>(
  initData: T[],
): TableDataModel<T> => {
  const tableData: TableRowModel<T>[] = [];
  const selected: Record<string, boolean> = {};

  for (const item of initData) {
    const jsUUID = crypto.randomUUID();
    tableData.push({ ...item, id: jsUUID });
    selected[jsUUID] = false;
  }

  return {
    rows: tableData,
    selected,
  };
};

export const Table = <T,>({
  columns,
  tableData,
  setTableData,
}: TableProps<T>) => {
  const handleTableCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const temp = tableData.selected[event.target.id as UUID];
    setTableData({
      ...tableData,
      selected: {
        ...tableData.selected,
        [event.target.id]: !temp,
      },
    });
  };

  if (tableData.rows.length === 0)
    return (
      <div className="table-component-no-data">
        <h2>No data found</h2>
      </div>
    );

  return (
    <table className="table-component-root" test-id="table-component-root">
      <thead className="table-header">
        <tr style={{ height: "50px" }}>
          {columns.map(({ accessor, header }, index) => (
            <th key={`${accessor}-${index}`} align="left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.rows.map((row) => (
          <TableRow key={row.id} isSelected={tableData.selected[row.id]}>
            {columns.map(({ accessor, renderCell }) =>
              accessor === "selected" ? (
                <td key={`table-cell-${accessor}-${row.id}`} align="center">
                  <TableCheckbox
                    id={row.id}
                    isChecked={tableData.selected[row.id]}
                    onChange={handleTableCheckBox}
                    aria-labelledby={row.name}
                  />
                </td>
              ) : renderCell ? (
                // Render a custom cell if provided by column definition
                renderCell(row)
              ) : (
                <TableCell key={`table-cell-${accessor}-${row.id}`} row={row}>
                  <>{row[accessor]}</>
                </TableCell>
              ),
            )}
          </TableRow>
        ))}
      </tbody>
    </table>
  );
};
