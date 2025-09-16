import { useState, useEffect } from "react";
import { Toaster as Sonner, toast } from "sonner";

const Toaster = ({ ...props }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Detect system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");

    // Optional: listen for system theme changes
    const listener = (e) => setTheme(e.matches ? "dark" : "light");
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listener);

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", listener);
    };
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
