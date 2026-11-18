import { queryOptions } from "@tanstack/react-query";
import { listServices } from "./services.functions";

export const servicesQuery = queryOptions({
  queryKey: ["services"],
  queryFn: () => listServices(),
  staleTime: 5 * 60_000,
});
