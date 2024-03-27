"use client";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const HomeComp = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    !isLoggedIn && router.replace("/login");
  }, []);

  return <div>Home</div>;
};
