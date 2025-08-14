"use client";

import { useSession } from "@clerk/nextjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Constants
import { ROUTES } from "@/constants/routes";
import { LOCAL_STORAGE_KEYS } from "@/constants/common";

// Components
import AlertDialog from "../AlertDialog";

const SessionWatcher = () => {
  const { session } = useSession();
  const router = useRouter();

  const prevSession = useRef<typeof session>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = useCallback((value = false) => {
    setIsOpen(value);
  }, []);

  const handleContinue = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleGoToSignIn = useCallback(() => {
    setIsOpen(false);
    router.push(ROUTES.SIGN_IN);
  }, []);

  useEffect(() => {
    if (prevSession.current && !session) {
      const wasManualSignOut = localStorage.getItem(LOCAL_STORAGE_KEYS.MANUAL_SIGN_OUT) === "true";

      if (!wasManualSignOut) {
        setIsOpen(true);
      }

      localStorage.removeItem(LOCAL_STORAGE_KEYS.MANUAL_SIGN_OUT);
    }
    prevSession.current = session;
  }, [session]);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={handleOpenChange}
      title="Session expired"
      description="Your session has expired. Please sign in again."
      textCancel="Close"
      textAction="Go to Sign In"
      onClickCancel={handleContinue}
      onClickAction={handleGoToSignIn}
    />
  );
};

export default SessionWatcher;
