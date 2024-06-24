import { ReactNode } from "react";

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export type Column<T> = {
  header: string;
  accessor: (keyof T & string) | "selected";
  renderCell?: (P: TableRowModel<T>) => ReactNode;
};

export type TableDataModel<T> = {
  rows: TableRowModel<T>[];
  selected: Record<string, boolean>;
};

// Check that we have a name an id. They are both required.
export type TableRowModel<T> = T & {
  name: string;
  id: UUID;
};

export type Selected = UUID | boolean;

// TODO: Sorting
export enum SortDir {
  NONE = "NONE",
  ASC = "ASC",
  DESC = "DESC",
}
