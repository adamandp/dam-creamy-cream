"use client";

import { ReactNode, useEffect } from "react";
import { initMocks } from "@/mocks";

export function MockProvider({
  children,
  isMocking,
}: {
  children: ReactNode;
  isMocking: string;
}) {
  useEffect(() => {
    if (isMocking === "enabled") {
      console.log("API mocking is enabled");
      initMocks();
    }
  }, [isMocking]);

  return <>{children}</>;
}
