"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQcp,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <ReactQcp client={queryClient}>{children}</ReactQcp>;
};

export default QueryClientProvider;
