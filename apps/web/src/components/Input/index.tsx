import React, { ComponentProps, useId } from "react";

// Utils
import { cn } from "@/utils/styles";

// Components
import { Input as ShadCNInput } from "@/components/ui/input";
import { Label } from "../ui/label";

type InputProps = ComponentProps<typeof ShadCNInput> & {
  label?: string;
  wrapperClassName?: string;
};

const Input = ({ label = "", wrapperClassName = "", ...props }: InputProps) => {
  const id = useId();

  return (
    <div className={cn("text-sm", wrapperClassName)}>
      {label && (
        <Label htmlFor={id} className="pb-1.25">
          {label}
        </Label>
      )}

      <ShadCNInput data-testid="input" id={id} {...props} />
    </div>
  );
};

export default Input;
