import { TableRowModel } from "../../types/table.types";

export interface TableCellProps<T>
  extends React.TableHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
  row: TableRowModel<T>;
}

export const TableCell = <T,>({
  children,
  align = "left",
  row,
  ...props
}: TableCellProps<T>) => {
  return (
    <td align={align} {...props} className="table-cell">
      <label htmlFor={row.id} id={row.name}>
        {children}
      </label>
    </td>
  );
};
