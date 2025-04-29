// src/components/StytchWrapper.js
import React from "react";
import { StytchProvider } from "@stytch/react";
import { StytchUIClient } from "@stytch/vanilla-js";

const publicToken = process.env.REACT_APP_STYTCH_PUBLIC_TOKEN;

if (!publicToken) {
  console.error("❌ STYTCH PUBLIC TOKEN is missing! Check your .env file.");
}

const stytchClient = publicToken ? new StytchUIClient(publicToken) : null;

const StytchWrapper = ({ children }) => {
  if (!stytchClient) return null; // or a fallback UI

  return <StytchProvider stytch={stytchClient}>{children}</StytchProvider>;
};

export default StytchWrapper;
