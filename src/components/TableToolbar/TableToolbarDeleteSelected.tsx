import { deleteItems } from "../../db/supabase";
import { getSelectedIds } from "./TableToolbarSelectAll";

// TODO: id -> map to table and re-factor types
export type DeleteProps<T> = T & {
  rows: any;
  selected: any;
};

export const TableToolbarDeleteSelected = <T,>({
  rows,
  selected,
}: DeleteProps<T>) => {
  const handleDeleteSelected = () => {
    const selectedIds = getSelectedIds(selected);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const rowsToDelete = rows
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      .filter(({ id }: { id: string }) => selectedIds.includes(id))
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      .map(({ uuid }: { uuid: string }) => uuid);
    deleteItems([rowsToDelete]);
  };

  return (
    <button
      style={{ justifySelf: "flex-end" }}
      onMouseDown={handleDeleteSelected}
    >
      Delete
    </button>
  );
};
