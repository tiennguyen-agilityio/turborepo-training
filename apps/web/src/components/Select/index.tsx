"use client";

import React, { ComponentProps, useId } from "react";

import {
  Select as ShadCNSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectTriggerProps,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

type SelectProps = ComponentProps<typeof ShadCNSelect> &
  SelectTriggerProps & {
    options: string[];
    label?: string;
    placeholder?: string;
  };

const Select = ({ label = "", placeholder = "", size, options, ...props }: SelectProps) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <Label htmlFor={id} className="pb-1.25 py-3">
          {label}
        </Label>
      )}
      <ShadCNSelect {...props}>
        <SelectTrigger id={id} className="w-full" size={size}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((item, index) => (
            <SelectItem key={index} value={item} size={size}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadCNSelect>
    </div>
  );
};

export default Select;
