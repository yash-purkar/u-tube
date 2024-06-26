"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { useRouter } from "next/navigation";
import { checkIsLoggedIn } from "../lib/redux/slices/authSlice";
import { setUser } from "../lib/redux/slices/userSlice";

export const CheckAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoggedIn, status, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [waitFor1Sec, setWaitFor1Sec] = useState(true);

  setTimeout(() => {
    setWaitFor1Sec(false);
  }, 1000);

  // It checks is userLoggedInOrNot
  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [dispatch]);

  // checKIsLoggedIn will return the user and and we'll store it in userSlice
  useEffect(() => {
    dispatch(setUser(user));
  }, [user, dispatch]);

  //   If user is not logged in redirect to login page.
  // useEffect(() => {
  //   status === "success" && isLoggedIn === false && router.replace("/login");
  // }, [isLoggedIn, router, status]);

  return <>{!waitFor1Sec && <>{children}</>}</>;
};
