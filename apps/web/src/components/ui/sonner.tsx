"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--success)",
          "--success-text": "var(--primary-foreground)",
          "--error-bg": "var(--error)",
          "--error-text": "var(--primary-foreground)",
          "--info-bg": "var(--info)",
          "--info-text": "var(--primary-foreground)",
          "--warning-bg": "var(--warning)",
          "--warning-text": "var(--primary-foreground)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
