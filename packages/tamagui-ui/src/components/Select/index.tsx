"use client";

import { useCallback, useId, useState } from "react";
import { Label, Select as TSelect, YStack } from "tamagui";
import { ChevronDown, Check } from "@tamagui/lucide-icons";

interface SelectProps {
  label?: string;
  items: { label: string; value: string }[];
  placeholder?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const Select = ({
  items,
  placeholder = "Select an option",
  label = "",
  defaultValue = "",
  onValueChange,
}: SelectProps) => {
  const id = useId();

  const [value, setValue] = useState(defaultValue);

  const handleValueChange = useCallback(
    (val: string) => {
      onValueChange?.(val);
      setValue(val);
    },
    [onValueChange],
  );

  return (
    <YStack>
      {label && (
        <Label
          htmlFor={id}
          fontSize="$sm"
          lineHeight="$sm"
          marginBottom="$1.5"
          cursor="pointer"
        >
          {label}
        </Label>
      )}
      <TSelect
        id={id}
        defaultValue={defaultValue}
        value={value}
        onValueChange={handleValueChange}
      >
        <TSelect.Trigger iconAfter={ChevronDown}>
          <TSelect.Value
            paddingLeft="$2"
            paddingVertical="$2"
            fontSize="$sm"
            lineHeight="$md"
            placeholder={placeholder}
          />
        </TSelect.Trigger>

        <TSelect.Content>
          <TSelect.ScrollUpButton />
          <TSelect.Viewport>
            {items?.map(({ value, label }, index) => (
              <TSelect.Item
                key={index}
                index={index}
                value={value}
                paddingHorizontal="$3"
                paddingVertical="$2"
              >
                <TSelect.ItemText fontSize="$sm" lineHeight="$md">
                  {label}
                </TSelect.ItemText>
                <TSelect.ItemIndicator>
                  <Check color="$primary" />
                </TSelect.ItemIndicator>
              </TSelect.Item>
            ))}
          </TSelect.Viewport>
          <TSelect.ScrollDownButton />
        </TSelect.Content>
      </TSelect>
    </YStack>
  );
};

export default Select;
