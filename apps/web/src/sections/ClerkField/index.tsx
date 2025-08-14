"use client";

import { HTMLInputTypeAttribute, useState, ComponentProps } from "react";
import { Field, Label, Input, FieldError, FieldState } from "@clerk/elements/common";
import { cn } from "@/utils/styles";

import Button from "@/components/Button";

type ClerkFieldProps = Omit<ComponentProps<typeof Input>, "type"> & {
  name: string;
  label?: string;
  type?: Exclude<HTMLInputTypeAttribute, "otp">;
  className?: string;
  wrapperClassName?: string;
};

const ClerkField = ({
  name,
  type = "text",
  label = "",
  placeholder = "",
  wrapperClassName = "",
  className = "",
  ...props
}: ClerkFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const isPassword = type === "password";

  const handleToggleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <FieldState>
      {(field) => (
        <Field name={name} className={wrapperClassName}>
          <Label className="mb-1.25">{label}</Label>
          <div className="relative">
            <Input
              type={isPassword && isVisible ? "text" : type}
              placeholder={placeholder}
              className={cn(
                "w-full rounded border border-input p-3 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50",
                field?.message && "border-destructive ring-destructive/20 dark:ring-destructive/40",
                className
              )}
              {...props}
            />
            {isPassword && (
              <Button
                variant="ghost"
                type="button"
                className="absolute right-3 h-full px-1 text-link hover:text-link/90 hover:bg-transparent"
                onClick={handleToggleVisible}
              >
                {isVisible ? "Hide Password" : "Show Password"}
              </Button>
            )}
          </div>
          <FieldError className="text-error" />
        </Field>
      )}
    </FieldState>
  );
};

export default ClerkField;
