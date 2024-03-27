"use client"

import React from "react";
import { Provider } from "react-redux";
import store from "../lib/redux/store";

export const ReduxStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Provider store={store}>{children}</Provider>;
};
