import { useCallback } from "react";
import { TableCheckbox } from "../Table/TableCheckbox";
import { UUID } from "../../types/table.types";
import { TableDataModel } from "../../types/table.types";

export const getSelectedIds = (selectedState: Record<UUID, boolean>) => {
  return Object.entries(selectedState)
    .filter(([_, value]) => value === true) // eslint-disable-line @typescript-eslint/no-unused-vars
    .map(([id, _]) => id); // eslint-disable-line @typescript-eslint/no-unused-vars
};

export type TableToolbarSelectAllProps<T> = {
  tableData: TableDataModel<T>;
  setTableData: React.Dispatch<React.SetStateAction<TableDataModel<T>>>;
  totalRows: number;
};

// TODO: style "pointer", etc.
// TODO: add aria
export const TableToolbarSelectAll = <T,>({
  tableData,
  setTableData,
  totalRows,
}: TableToolbarSelectAllProps<T>) => {
  // The Select All/None checkbox action. React's `useCallback` is used to cache this function.
  const toggleAllRows = useCallback(() => {
    setTableData((prevData) => {
      const current = getSelectedIds(prevData.selected);
      const isAllSelected = current.length === prevData.rows.length;
      const newSelected = { ...prevData.selected };

      for (const itemId in newSelected) {
        newSelected[itemId] = !isAllSelected;
      }

      return {
        ...prevData,
        selected: newSelected,
      };
    });
  }, []);

  const totalSelected = getSelectedIds(tableData.selected).length;

  return (
    <div
      style={{ display: "flex", paddingLeft: "0.5em" }}
      className="table-toolbar-select-all"
    >
      <TableCheckbox
        id="table-toolbar-select-all-input"
        onChange={toggleAllRows}
        isChecked={totalSelected > 0}
        isIndeterminate={totalSelected > 0 && totalSelected !== totalRows}
        aria-label="Select All or Select None"
        aria-labelledby="table-toolbar-select-all-label"
      />
      <label
        htmlFor="table-toolbar-select-all-input"
        id="table-toolbar-select-all-label"
        data-testid="table-toolbar-select-all-label"
      >
        {totalSelected === 0 ? "None Selected" : `Selected ${totalSelected}`}
      </label>
    </div>
  );
};
