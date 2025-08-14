"use client";

import { memo, useCallback, useState } from "react";

import { LOCATIONS, CATEGORIES } from "@/constants/common";

import { Filter } from "@/types/common";

import { formatAmount } from "@/utils/common";

import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Toggle } from "../ui/toggle";

interface LocationFilterProps {
  defaultValue?: Filter;
  onChange: (value: Filter) => void;
}

const DEFAULT_VALUE = {
  budget: [],
  locations: [],
  categories: [],
};

const LocationFilter = ({ defaultValue = DEFAULT_VALUE, onChange }: LocationFilterProps) => {
  const [budget, setBudget] = useState<number[]>(defaultValue?.budget || []);

  const [locations, setLocation] = useState<string[]>(defaultValue?.locations || []);
  const [categories, setCategories] = useState<string[]>(defaultValue?.categories || []);

  const handleChangeBudget = useCallback((value: number[]) => {
    setBudget(value);
  }, []);

  const handleBudgetCommit = useCallback(
    (value: number[]) => {
      onChange({ budget: value });
    },
    [onChange]
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
    [locations, onChange]
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
    [categories, onChange]
  );

  return (
    <div className="w-full">
      <p className="text-2xl w-fit pb-3 mb-5 border-b-[3px] border-chart-2">Filter By</p>
      <div className="w-full bg-sidebar-accent p-5">
        <div>
          <Label className="mb-4">Budget Per Night</Label>
          <Slider
            data-testid="slider"
            max={11000}
            step={100}
            value={budget}
            onValueChange={handleChangeBudget}
            onValueCommit={handleBudgetCommit}
          />
          <div className="flex justify-between mt-3">
            <span>KES. {formatAmount(budget[0])}</span>
            <span>KES. {formatAmount(budget[1])}</span>
          </div>
        </div>
        <div className="w-full border-t border-dashed border-border my-4" />
        <div className="mt-1">
          <Label>Location</Label>
          <div className="flex flex-wrap mt-3 gap-2.5">
            {LOCATIONS.map(({ text, value }) => {
              const isPressed = locations.includes(value);

              const handleChange = (pressed: boolean) => {
                handleChangeLocation(value, pressed);
              };

              return (
                <Toggle
                  data-testid={value}
                  key={value}
                  variant="outline"
                  pressed={isPressed}
                  onPressedChange={handleChange}
                >
                  {text}
                </Toggle>
              );
            })}
          </div>
        </div>
        <div className="w-full border-t border-dashed border-border my-4" />
        <div className="mt-1">
          <Label>Category</Label>
          <div className="flex flex-wrap mt-3 gap-2.5">
            {CATEGORIES.map(({ text, value }) => {
              const isPressed = categories.includes(value);

              const handleChange = (pressed: boolean) => {
                handleChangeCategory(value, pressed);
              };

              return (
                <Toggle
                  key={value}
                  variant="outline"
                  pressed={isPressed}
                  onPressedChange={handleChange}
                >
                  {text}
                </Toggle>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LocationFilter);
