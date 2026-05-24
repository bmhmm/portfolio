"use client";

import { useState } from "react";

export function useBrainMode() {
  const [isBrainMode, setIsBrainMode] = useState(false);

  const toggleBrainMode = () => {
    setIsBrainMode((prev) => !prev);
  };

  const enableBrainMode = () => {
    setIsBrainMode(true);
  };

  const disableBrainMode = () => {
    setIsBrainMode(false);
  };

  return {
    isBrainMode,
    toggleBrainMode,
    enableBrainMode,
    disableBrainMode,
  };
}