"use client";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("0cd4ae7e-a3b9-4823-b1ee-787cc30c5735");
  }, []);
  return null;
};
