import { Input as TInput, Label, YStack, styled } from "tamagui";
import { ComponentProps, useId } from "react";

const InputFrame = styled(TInput, {
  name: "InputFrame",
  borderRadius: "$1",
  paddingVertical: "$3",
  paddingHorizontal: "$2.5",
  placeholderTextColor: "$mutedForeground",
  borderColor: "$input",

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

type InputProps = ComponentProps<typeof TInput> & {
  label?: string;
  invalid?: boolean;
};

const Input = ({ label, invalid, ...props }: InputProps) => {
  const id = useId();

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
      <InputFrame id={id} {...props} invalid={invalid} />
    </YStack>
  );
};

export default Input;
