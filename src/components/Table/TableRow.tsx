export type TableRowProps = {
  children?: React.ReactNode;
  isSelected?: boolean;
};

export const TableRow = ({ children, isSelected, ...props }: TableRowProps) => {
  return (
    <tr
      className={`table-row ${isSelected && "is-selected"}`}
      {...props}
      data-testid={"table-row"}
    >
      {children}
    </tr>
  );
};
