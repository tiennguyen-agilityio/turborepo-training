"use client";

import { ReactNode } from "react";
import { CircleCheck } from "@tamagui/lucide-icons";
import { Toast as TToast, useToastState } from "@tamagui/toast";
import { XStack, YStack } from "tamagui";

import { CloseIcon, InfoIcon, WarningIcon } from "../../icons";

interface TypeConfig {
  backgroundColor: string;
  color: string;
  icon: ReactNode;
}

const TYPE_CONFIGS: Record<string, TypeConfig> = {
  success: {
    backgroundColor: "$success",
    color: "white",
    icon: <CircleCheck color="white" />,
  },
  error: {
    backgroundColor: "$error",
    color: "white",
    icon: <CloseIcon color="white" />,
  },
  warning: {
    backgroundColor: "$warning",
    color: "white",
    icon: <WarningIcon color="white" />,
  },
  info: {
    backgroundColor: "$info",
    color: "white",
    icon: <InfoIcon color="white" />,
  },
};

const Toast = () => {
  const toastState = useToastState();

  if (!toastState || toastState.isHandledNatively) return null;

  const {
    id,
    title,
    message,
    type = "success",
    duration,
    viewportName,
  } = toastState;

  const { backgroundColor, color, icon } = TYPE_CONFIGS[type];

  return (
    <TToast
      animation="200ms"
      key={id}
      duration={duration}
      enterStyle={{ opacity: 0, transform: [{ translateY: 100 }] }}
      exitStyle={{ opacity: 0, transform: [{ translateY: 100 }] }}
      transform={[{ translateY: 0 }]}
      opacity={1}
      scale={1}
      viewportName={viewportName}
      borderRadius="$2"
      backgroundColor={backgroundColor}
    >
      <YStack>
        <XStack alignContent="center" alignItems="center" gap="$2">
          {icon}
          <TToast.Title color={color}>{title}</TToast.Title>
        </XStack>
        {!!message && (
          <TToast.Description color={color}>{message}</TToast.Description>
        )}
      </YStack>
    </TToast>
  );
};

export default Toast;
