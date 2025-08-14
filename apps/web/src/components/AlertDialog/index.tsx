"use-client";

import {
  AlertDialog as ShadCNAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Button from "../Button";

interface AlertDialogProps {
  title: string;
  description?: string;
  textButton?: string;
  textCancel?: string;
  textAction?: string;
  open?: boolean;
  isLoading?: boolean;
  onOpenChange?: (open?: boolean) => void;
  onClickAction?: () => void;
  onClickCancel?: () => void;
}

const AlertDialog = ({
  title,
  description = "",
  textButton = "",
  textCancel = "Cancel",
  textAction = "Continue",
  open = false,
  isLoading = false,
  onOpenChange,
  onClickAction,
  onClickCancel,
}: AlertDialogProps) => {
  return (
    <ShadCNAlertDialog open={open} onOpenChange={onOpenChange}>
      {textButton && (
        <AlertDialogTrigger asChild className="p-0">
          <Button
            disabled={isLoading}
            data-testid="btn-confirm"
            variant="ghost"
            className="p-0 h-auto hover:bg-transparent"
          >
            {textButton}
          </Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            data-testid="btn-cancel"
            disabled={isLoading}
            onClick={onClickCancel}
            className="h-10"
          >
            {textCancel}
          </AlertDialogCancel>
          <AlertDialogAction
            data-testid="btn-continue"
            disabled={isLoading}
            onClick={onClickAction}
            className="h-10"
          >
            {textAction}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </ShadCNAlertDialog>
  );
};

export default AlertDialog;
