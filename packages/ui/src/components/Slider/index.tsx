"use client";

import { memo, useCallback, useState } from "react";
import {
  Slider as TSlider,
  SliderProps as TSliderProps,
  XStack,
  YStack,
  Paragraph,
  Label,
} from "tamagui";

interface SliderProps extends TSliderProps {
  label?: string;
  onValueChange: (value: number[]) => void;
}

const Slider = ({
  label,
  defaultValue,
  min = 0,
  max = 11000,
  step = 100,
  onValueChange,
  ...props
}: SliderProps) => {
  const [values, setValues] = useState(defaultValue || []);

  const handleValueChange = useCallback(
    (value: number[]) => {
      setValues(value);
      onValueChange(value);
    },
    [onValueChange]
  );

  return (
    <YStack gap="$2">
      {label && (
        <Label
          fontSize="$sm"
          lineHeight="$sm"
          marginBottom="$2"
          cursor="pointer"
        >
          {label}
        </Label>
      )}

      <TSlider
        size="$2.5"
        borderRadius={0}
        backgroundColor="$info"
        min={min}
        max={max}
        defaultValue={defaultValue}
        step={step}
        onValueChange={handleValueChange}
        {...props}
      >
        <TSlider.Track backgroundColor="$info">
          <TSlider.TrackActive backgroundColor="$info" />
        </TSlider.Track>
        <TSlider.Thumb
          circular
          size="$2.5"
          borderWidth={1}
          borderColor="$background"
          index={0}
          backgroundColor="$info"
          hoverStyle={{
            backgroundColor: "$info",
            opacity: 0.85,
          }}
          focusStyle={{
            outlineColor: "transparent",
          }}
        />
        <TSlider.Thumb
          circular
          size="$2.5"
          borderWidth={1}
          borderColor="$background"
          index={1}
          backgroundColor="$info"
          hoverStyle={{
            backgroundColor: "$info",
            opacity: 0.85,
          }}
          focusStyle={{
            outlineColor: "transparent",
          }}
        />
      </TSlider>

      <XStack justifyContent="space-between">
        <Paragraph size="$base">KES. {values[0].toLocaleString()}</Paragraph>
        <Paragraph size="$base">KES. {values[1].toLocaleString()}</Paragraph>
      </XStack>
    </YStack>
  );
};

export default memo(Slider);
