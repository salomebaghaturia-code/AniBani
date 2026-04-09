"use client";

import { useEffect } from "react";
import { trackSession } from "@/lib/analytics";

export default function SessionTracker() {
  useEffect(() => {
    void trackSession();
  }, []);
  return null;
}
