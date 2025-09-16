import { Experience } from "@packages/types/common";

// Components
import { H6, YStack } from "tamagui";
import Button from "../Button";

export interface ExperienceItemProps extends Experience {
  isActive?: boolean;
  onClick?: () => void;
}

const ExperienceItem = ({
  title,
  label = "",
  isActive = false,
  onClick,
}: ExperienceItemProps) => {
  return (
    <YStack gap="$2.5" justifyContent="flex-start">
      {label && (
        <H6
          size="$2.5"
          textTransform="uppercase"
          textAlign="center"
          fontWeight={700}
          lineHeight="$3.5"
          color="$ring"
          $xs={{
            textAlign: "left",
            size: "$3.5",
          }}
        >
          {label}
        </H6>
      )}

      <Button
        variant="ghost"
        justifyContent="flex-start"
        height="min-content"
        width="min-content"
        paddingVertical={0}
        paddingRight="$2"
        borderBottomWidth={1}
        borderBottomColor={isActive ? "$primary" : "transparent"}
        borderRadius={0}
        color={isActive ? "$primary" : "$color"}
        backgroundColor="transparent"
        hoverStyle={{
          backgroundColor: "transparent",
        }}
        $sm={{
          paddingRight: "$5",
        }}
        onPress={onClick}
      >
        {title}
      </Button>
    </YStack>
  );
};

export default ExperienceItem;
