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
  const { isLoggedIn, status } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // It checks is userLoggedInOrNot
  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [dispatch]);

  //   If user is not logged in redirect to login page.
  useEffect(() => {
    status === "success" && isLoggedIn === false && router.replace("/login");
  }, [isLoggedIn, router, status]);

  return <>{children}</>;
};
