"use client";

import { useCallback, useState } from "react";
import { useThemeSetting } from "@tamagui/next-theme";
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from "tamagui";
import { YStack, XStack } from "tamagui";

// Components
import MoonIcon from "../../icons/MoonIcon";
import SunIcon from "../../icons/SunIcon";
import Button from "../Button";

interface ThemeToggleProps {
  onChange?: () => void;
}

const ThemeToggle = ({ onChange }: ThemeToggleProps) => {
  const { current, toggle, set } = useThemeSetting();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = useCallback(
    (value: string) => {
      set(value);
      setIsOpen(false);
      onChange?.();
    },
    [onChange, set]
  );

  const handleOpenChange = useCallback((value: boolean) => {
    setIsOpen(value);
  }, []);

  const handleToggleTheme = useCallback(() => {
    toggle();
    onChange?.();
  }, [onChange, toggle]);

  return (
    <YStack>
      <XStack display="none" $md={{ display: "flex" }}>
        <Popover
          placement="bottom-end"
          open={isOpen}
          onOpenChange={handleOpenChange}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outlined"
              width="$9"
              height="$9"
              backgroundColor="transparent"
            >
              {current === "light" ? <SunIcon /> : <MoonIcon />}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            bordered
            borderColor="$border"
            elevate
            padding="$2"
            animation="quick"
          >
            <PopoverArrow />
            <YStack minWidth="$25" justifyContent="flex-start">
              <Button
                variant="ghost"
                height="$10"
                borderRadius="none"
                justifyContent="flex-start"
                paddingHorizontal="$5"
                borderBottomWidth={1}
                borderBottomColor="$border"
                color="$color"
                textProps={{
                  textAlign: "left",
                }}
                onPress={() => handleChange("light")}
              >
                Light
              </Button>
              <Button
                variant="ghost"
                height="$10"
                color="$color"
                justifyContent="flex-start"
                paddingHorizontal="$5"
                borderRadius="none"
                textProps={{
                  textAlign: "left",
                }}
                onPress={() => handleChange("dark")}
              >
                Dark
              </Button>
            </YStack>
          </PopoverContent>
        </Popover>
      </XStack>

      <XStack $md={{ display: "none" }} paddingHorizontal="$3" marginTop="$2">
        <Button
          variant="outlined"
          width="$8"
          height="$8"
          backgroundColor="transparent"
          onPress={handleToggleTheme}
        >
          {current === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </XStack>
    </YStack>
  );
};

export default ThemeToggle;
