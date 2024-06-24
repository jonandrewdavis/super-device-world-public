// Not used.

import { useCallback, useState } from "react";
import { TableDataModel } from "../../types/table.types";
import { FileItem, FileStatus } from "../../types/file.types";

export type ToolbarAddRowProps = {
  setTableData: React.Dispatch<React.SetStateAction<TableDataModel<FileItem>>>;
};

export const TableToolbarAddRow = ({ setTableData }: ToolbarAddRowProps) => {
  const [count, setCount] = useState(0);

  const countText = count === 0 ? "" : `${count}`;

  const addNewRow = useCallback(() => {
    setTableData((prevData: TableDataModel<FileItem>) => {
      const newData: FileItem[] = [
        {
          name: `coin${countText}.exe`,
          device: "Wario",
          path: `\\Device\\HarddiskVolume\\Windows\\System32\\coin${count}.exe`,
          status:
            Math.floor(Math.random() * 10) % 2 === 0
              ? FileStatus.Available
              : FileStatus.Scheduled,
        },
      ];
      setCount(count + 1);
      const newSelected: Record<string, boolean> = {};
      const tempData = [];

      for (const item of newData) {
        const jsUUID = crypto.randomUUID();
        tempData.push({ ...item, id: jsUUID });
        newSelected[jsUUID] = false;
      }

      return {
        rows: [...prevData.rows, ...tempData],
        selected: { ...prevData.selected, ...newSelected },
      };
    });
  }, [count]);
  return (
    <button style={{ justifySelf: "flex-end" }} onMouseDown={addNewRow}>
      Add
    </button>
  );
};
