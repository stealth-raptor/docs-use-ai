// app/clarity-provider.js
"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityProvider() {
  useEffect(() => {
    Clarity.init("swk6rivk5n"); // 👈 your project ID
  }, []);

  return null; // nothing to render
}
