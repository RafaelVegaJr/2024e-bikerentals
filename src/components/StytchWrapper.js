// src/components/StytchWrapper.js
import React from "react";
import { StytchProvider } from "@stytch/react";
import { StytchUIClient } from "@stytch/vanilla-js";

const stytchClient = new StytchUIClient(
  process.env.REACT_APP_STYTCH_PUBLIC_TOKEN // <-- directly the string, NOT inside {}
);

const StytchWrapper = ({ children }) => {
  return <StytchProvider stytch={stytchClient}>{children}</StytchProvider>;
};

export default StytchWrapper;
