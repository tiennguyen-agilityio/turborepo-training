"use client";

import { useId } from "react";

import { Checkbox as ShadCNCheckbox, CheckBoxProps } from "../ui/checkbox";
import { Label } from "../ui/label";

type Props = CheckBoxProps & {
  label?: string;
};

const Checkbox = ({ label, ...props }: Props) => {
  const id = useId();

  return (
    <div className="flex items-center space-x-2">
      <ShadCNCheckbox data-testid="checkbox" id={id} {...props} />
      {label && <Label htmlFor={id}>{label}</Label>}
    </div>
  );
};

export default Checkbox;
