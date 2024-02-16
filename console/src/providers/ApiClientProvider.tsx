import { type FC, type ReactNode } from "react";
import { type ServiceClient } from "@pincodes/service-client";
import { ApiClientContext } from "../context";

export const ApiClientProvider: FC<{
  apiClient: ServiceClient;
  children: ReactNode;
}> = ({ apiClient, children }) => (
  <ApiClientContext.Provider value={apiClient}>
    {children}
  </ApiClientContext.Provider>
);
