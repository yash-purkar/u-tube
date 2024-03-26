"use client";
import { checkAuth } from "@/clientHandlers/userHandlers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const HomeComp = () => {
  axios.defaults.withCredentials = true;
  const { data, isSuccess, refetch } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkAuth,
  });
  const router = useRouter();

  if (!data?.Success) {
    router.replace("/login");
  }

  return <div>Home</div>;
};
