// Not used.

import { useCallback, useState } from "react";
import { TableDataModel } from "../../types/table.types";
import { FileItem, FileStatus } from "../../types/file.types";
import { createItem } from "../../db/supabase";
import { statusEnum } from "../../db/schema";

export type ToolbarAddRowProps = {
  setTableData: React.Dispatch<React.SetStateAction<TableDataModel<FileItem>>>;
};

export const TableToolbarAddRow = ({ setTableData }: ToolbarAddRowProps) => {
  const [count, setCount] = useState(0);

  const countText = count === 0 ? "" : `${count}`;

  const addNewRow = useCallback(() => {
    const newData = {
      name: `coin${countText}.exe`,
      device: "Wario",
      path: `\\Device\\HarddiskVolume\\Windows\\System32\\coin${count}.exe`,
      status:
        Math.floor(Math.random() * 10) % 2 === 0
          ? statusEnum.enumValues[1]
          : statusEnum.enumValues[2],
    };
    setCount(count + 1);
    createItem(newData);
  }, [count]);
  return (
    <button style={{ justifySelf: "flex-end" }} onMouseDown={addNewRow}>
      Add
    </button>
  );
};
