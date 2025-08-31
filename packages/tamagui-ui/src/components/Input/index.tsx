import { Input as TInput, Label, YStack, styled, Text, Stack } from "tamagui";
import { ComponentProps, useCallback, useId, useState } from "react";
import Button from "../Button";

const InputFrame = styled(TInput, {
  name: "InputFrame",
  borderRadius: "$1",
  paddingVertical: "$3",
  paddingHorizontal: "$2.5",
  placeholderTextColor: "$mutedForeground",
  borderColor: "$input",
  fontSize: "$sm",

  focusStyle: {
    outlineWidth: 0,
    borderColor: "$ring",
  },

  disabledStyle: {
    color: "$ring",
    cursor: "not-allowed",
  },

  variants: {
    size: {
      sm: {
        height: "$8",
        fontSize: "$sm",
      },
      md: {
        height: "$10",
        fontSize: "$md",
      },
      default: {
        height: "$11.5",
      },
      lg: {
        height: 48,
        fontSize: "$lg",
      },
    },
    invalid: {
      true: {
        borderColor: "$error",
      },
    },
  } as const,

  defaultVariants: {
    size: "default",
  },
});

export type InputProps = ComponentProps<typeof TInput> & {
  label?: string;
  errorMessage?: string;
  isPassword?: boolean;
};

const Input = ({
  label = "",
  errorMessage = "",
  isPassword = false,
  ...props
}: InputProps) => {
  const id = useId();

  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisible = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

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
      <Stack position="relative">
        <InputFrame
          id={id}
          invalid={!!errorMessage}
          secureTextEntry={isPassword && !isVisible}
          {...props}
        />
        {isPassword && (
          <Button
            variant="link"
            textProps={{
              textDecorationLine: "none",
              textDecorationColor: "transparent",
            }}
            position="absolute"
            top="50%"
            y="-50%"
            right="$2"
            onPress={handleToggleVisible}
          >
            {isVisible ? "Hide Password" : "Show Password"}
          </Button>
        )}
      </Stack>
      {errorMessage && (
        <Text marginTop="$1.5" fontSize="$xs" color="$error">
          {errorMessage}
        </Text>
      )}
    </YStack>
  );
};

export default Input;
