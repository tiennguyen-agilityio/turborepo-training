"use client";

import { useId } from "react";
import { Checkbox as TCheckbox, Label, XStack, LabelProps } from "tamagui";
import { Check } from "@tamagui/lucide-icons";

type Props = React.ComponentProps<typeof TCheckbox> & {
  label?: string;
  labelProps?: LabelProps;
};

const Checkbox = ({
  label,
  size = "$12",
  labelProps = {},
  disabled = false,
  ...props
}: Props) => {
  const id = useId();

  return (
    <XStack alignItems="center" gap="$2.5">
      <TCheckbox id={id} size={size} overflow="hidden" {...props}>
        <TCheckbox.Indicator
          width="$full"
          height="$full"
          backgroundColor="$primary"
          alignItems="center"
          justifyContent="center"
          disabled={disabled}
          cursor=""
        >
          <Check size="$4" color="$background" />
        </TCheckbox.Indicator>
      </TCheckbox>
      {label && (
        <Label
          htmlFor={id}
          size="$3.5"
          cursor={disabled ? "default" : "pointer"}
          {...labelProps}
        >
          {label}
        </Label>
      )}
    </XStack>
  );
};

export default Checkbox;
