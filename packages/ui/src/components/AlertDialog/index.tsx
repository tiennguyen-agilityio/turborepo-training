"use client";

import {
  AlertDialog as TAlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  Stack,
} from "tamagui";

import Button from "../Button";

export interface AlertDialogProps {
  title: string;
  description?: string;
  textCancel?: string;
  textAction?: string;
  open?: boolean;
  isLoading?: boolean;
  onOpenChange?: () => void;
  onClickAction?: () => void;
  onClickCancel?: () => void;
}

const AlertDialog = ({
  title,
  description = "",
  textCancel = "Cancel",
  textAction = "Continue",
  open = false,
  isLoading = false,
  onOpenChange,
  onClickAction,
  onClickCancel,
}: AlertDialogProps) => {
  return (
    <TAlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogPortal paddingHorizontal="$5">
        <AlertDialogOverlay
          animation="quick"
          opacity={0.5}
          backgroundColor="$popoverForeground"
        />
        <AlertDialogContent
          bordered
          elevate
          animation="quick"
          padding="$4"
          gap="$3"
          width="100%"
          maxWidth="$128"
          borderColor="$border"
        >
          <AlertDialogTitle fontSize="$md" fontWeight={700}>
            {title}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription fontSize="$sm">
              {description}
            </AlertDialogDescription>
          )}
          <Stack
            gap="$3"
            justifyContent="flex-end"
            marginTop="$3"
            $xs={{
              flexDirection: "row",
            }}
          >
            <AlertDialogCancel asChild onPress={onClickCancel} key="cancel">
              <Button
                size={40}
                paddingHorizontal="$4"
                disabled={isLoading}
                variant="outlined"
              >
                {textCancel}
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild onPress={onClickAction} key="action">
              <Button size={40} paddingHorizontal="$4" disabled={isLoading}>
                {textAction}
              </Button>
            </AlertDialogAction>
          </Stack>
        </AlertDialogContent>
      </AlertDialogPortal>
    </TAlertDialog>
  );
};

export default AlertDialog;
