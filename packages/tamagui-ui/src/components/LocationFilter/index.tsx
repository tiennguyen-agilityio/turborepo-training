"use client";

import { memo, useCallback, useState } from "react";
import { YStack, XStack, Paragraph, Separator, Text } from "tamagui";

// Types
import { Filter } from "@repo/types/common";

// Constants
import { LOCATIONS, CATEGORIES } from "@repo/constants/common";

// Components
import Button from "../Button";
import Slider from "../Slider";

interface LocationFilterProps {
  defaultValue?: Filter;
  onChange: (value: Filter) => void;
}

const DEFAULT_VALUE: Filter = {
  budget: [],
  locations: [],
  categories: [],
};

const LocationFilter = ({
  defaultValue = DEFAULT_VALUE,
  onChange,
}: LocationFilterProps) => {
  const [locations, setLocation] = useState<string[]>(
    defaultValue?.locations || [],
  );
  const [categories, setCategories] = useState<string[]>(
    defaultValue?.categories || [],
  );

  const handleChangeBudget = useCallback(
    (value: number[]) => {
      onChange({ budget: value });
    },
    [onChange],
  );

  const handleChangeLocation = useCallback(
    (value: string, isAdd = false) => {
      let newLocations = [...locations];
      if (isAdd) {
        if (!locations.includes(value)) {
          newLocations = [...locations, value];
        }
      } else {
        newLocations = locations.filter((item) => item !== value);
      }

      onChange({ locations: newLocations });
      setLocation(newLocations);
    },
    [locations, onChange],
  );

  const handleChangeCategory = useCallback(
    (value: string, isAdd = false) => {
      let newCategories = [...categories];
      if (isAdd) {
        if (!categories.includes(value)) {
          newCategories = [...categories, value];
        }
      } else {
        newCategories = categories.filter((item) => item !== value);
      }

      onChange({ categories: newCategories });
      setCategories(newCategories);
    },
    [categories, onChange],
  );

  return (
    <YStack width="100%">
      <Paragraph
        fontSize="$xl"
        lineHeight="$xl"
        borderBottomWidth={3}
        borderBottomColor="$chart2"
        paddingBottom="$3"
        marginBottom="$5"
        width="fit-content"
      >
        Filter By
      </Paragraph>

      <YStack backgroundColor="$accent" padding="$5" borderRadius="$1">
        <Slider
          label="Budget Per Night"
          defaultValue={defaultValue?.budget}
          onValueChange={handleChangeBudget}
        />
        <Separator marginVertical="$4" borderColor="$border" />
        <Text fontSize="$sm">Location</Text>
        <XStack flexWrap="wrap" marginTop="$3" gap="$2.5">
          {LOCATIONS.map(({ text, value }) => {
            const isActive = locations.includes(value);
            const handleChange = (pressed: boolean) => {
              handleChangeLocation(value, pressed);
            };

            return (
              <Button
                key={value}
                borderWidth={1}
                borderColor="$border"
                height="$10"
                paddingHorizontal="$4"
                {...(isActive
                  ? {
                      variant: "default",
                      backgroundColor: "$info",
                      color: "$background",
                    }
                  : {
                      variant: "outlined",
                      backgroundColor: "transparent",
                      color: "$color",
                    })}
                onPress={() => handleChange(!isActive)}
              >
                {text}
              </Button>
            );
          })}
        </XStack>
        <Separator marginVertical="$4" borderColor="$border" />
        <Text fontSize="$sm">Category</Text>
        <XStack flexWrap="wrap" marginTop="$3" gap="$2.5">
          {CATEGORIES.map(({ text, value }) => {
            const isActive = categories.includes(value);
            const handleChange = (pressed: boolean) => {
              handleChangeCategory(value, pressed);
            };

            return (
              <Button
                key={value}
                borderWidth={1}
                borderColor="$border"
                height="$10"
                paddingHorizontal="$4"
                {...(isActive
                  ? {
                      variant: "default",
                      backgroundColor: "$info",
                      color: "$background",
                    }
                  : {
                      variant: "outlined",
                      backgroundColor: "transparent",
                      color: "$color",
                    })}
                onPress={() => handleChange(!isActive)}
              >
                {text}
              </Button>
            );
          })}
        </XStack>
      </YStack>
    </YStack>
  );
};

export default memo(LocationFilter);
