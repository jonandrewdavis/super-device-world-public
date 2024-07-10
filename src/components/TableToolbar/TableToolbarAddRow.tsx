import { useCallback, useState } from "react";
import { createItems } from "../../db/supabase";
import { statusEnum } from "../../db/schema";

const tempValues = {
  name: ["block.bin", "coin.exe", "star.bat", "mushroom.msi"],
  device: ["Donkey Kong", "Bowser", "Wario", "Waluigi"],
};

export const TableToolbarAddRow = () => {
  const [count, setCount] = useState(0);

  const addNewRow = useCallback(() => {
    const roll = Math.floor(Math.floor(Math.random() * 4) + 1);
    const newData = {
      name: tempValues.name[roll],
      device: tempValues.device[roll],
      path: `\\Device\\HarddiskVolume\\${tempValues.device[roll]}\\System32\\${tempValues.name[roll]} (${count})`,
      status:
        Math.floor(Math.random() * 10) % 2 === 0
          ? statusEnum.enumValues[1]
          : statusEnum.enumValues[2],
    };
    setCount(count + 1);
    createItems([newData]);
  }, [count]);
  return (
    <button style={{ justifySelf: "flex-end" }} onMouseDown={addNewRow}>
      Add
    </button>
  );
};
