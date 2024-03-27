"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { useRouter } from "next/navigation";
import { checkIsLoggedIn } from "../lib/redux/slices/authSlice";

export const CheckAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // It checks is userLoggedInOrNot
  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, []);

  //   If user is not logged in redirect to login page.
  useEffect(() => {
    !isLoggedIn && router.replace("/login");
  }, [isLoggedIn]);

  return <>{children}</>;
};
