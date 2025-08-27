import { Experience } from "@repo/types/common";

// Components
import { H6, YStack, styled } from "tamagui";
import Button from "../Button";

export interface ExperienceItemProps extends Experience {
  isActive?: boolean;
  onClick?: () => void;
}

const LinkButton = styled(Button, {
  variant: "ghost",
  borderWidth: 0,
  borderRadius: 0,
  borderBottomWidth: 1,
  borderColor: "transparent",
  paddingVertical: "$1",
  paddingRight: "$3",
  paddingLeft: 0,
  color: "$color",
  fontWeight: 700,
  fontSize: "$4",
  height: "$5",
  hoverStyle: {
    opacity: 1,
    backgroundColor: "transparent",
    borderColor: "$primary",
  },
  textProps: {
    lineHeight: "$sm",
    textTransform: "capitalize",
    hoverStyle: {
      color: "$primary",
    },
  },

  variants: {
    active: {
      true: {
        color: "$primary",
        borderColor: "$primary",
      },
    },
  } as const,
});

const ExperienceItem = ({
  title,
  label = "",
  isActive = false,
  onClick,
}: ExperienceItemProps) => {
  return (
    <YStack maxWidth="fit-content" gap="$2.5" justifyContent="flex-start">
      {label && (
        <H6
          size="$3.5"
          textTransform="uppercase"
          textAlign="left"
          fontWeight={700}
          lineHeight="$3.5"
          color="$ring"
        >
          {label}
        </H6>
      )}

      <LinkButton active={isActive} onPress={onClick}>
        {title}
      </LinkButton>
    </YStack>
  );
};

export default ExperienceItem;
