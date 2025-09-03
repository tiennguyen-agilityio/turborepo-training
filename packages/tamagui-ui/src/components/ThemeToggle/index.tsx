"use client";

import { useCallback, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from "tamagui";
import { YStack, XStack } from "tamagui";

// Hooks
import { useThemeStore, ThemeName } from "@repo/hooks/useThemeStore";

// Components
import { MoonIcon, SunIcon } from "../../icons";
import Button from "../Button";

interface ThemeToggleProps {
  onChange?: () => void;
}

const ThemeToggle = ({ onChange }: ThemeToggleProps) => {
  const { setTheme, toggleTheme, theme = "light" } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = useCallback(
    (value: ThemeName) => {
      setTheme(value);
      setIsOpen(false);
      onChange?.();
    },
    [onChange],
  );

  const handleOpenChange = useCallback((value: boolean) => {
    setIsOpen(value);
  }, []);

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
    onChange?.();
  }, [onChange]);

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
              {theme === "light" ? <SunIcon /> : <MoonIcon />}
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
            <YStack minWidth="$25">
              <Button
                variant="ghost"
                height="$10"
                borderRadius="none"
                borderBottomWidth={1}
                borderBottomColor="$border"
                color="$color"
                onPress={() => handleChange("light")}
              >
                Light
              </Button>
              <Button
                variant="ghost"
                height="$10"
                color="$color"
                borderRadius="none"
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
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </XStack>
    </YStack>
  );
};

export default ThemeToggle;
