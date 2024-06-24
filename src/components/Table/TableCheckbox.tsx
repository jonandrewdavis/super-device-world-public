import { ChangeEvent, useEffect, useRef } from "react";

export interface TableCheckBoxProps
  extends React.ButtonHTMLAttributes<HTMLInputElement> {
  id: string;
  isChecked?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  "aria-labelledby": string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TableCheckbox = ({
  id,
  isChecked,
  isIndeterminate,
  onChange,
  ...props
}: TableCheckBoxProps) => {
  const checkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkRef.current) {
      checkRef.current.indeterminate = isIndeterminate || false;
    }
  }, [checkRef, isIndeterminate, isChecked]);

  // TODO: Should you be able to click an entire row to check the box?
  return (
    <>
      <input
        type="checkbox"
        id={id}
        data-testid={id}
        checked={isChecked}
        onChange={onChange}
        ref={checkRef}
        {...props}
      />
    </>
  );
};
