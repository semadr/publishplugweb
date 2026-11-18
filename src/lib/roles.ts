import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** The signed-in user's roles, read from the protected roles table (RLS: own rows only). */
export const myRolesQuery = queryOptions({
  queryKey: ["my-roles"],
  queryFn: async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return [] as string[];
    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", auth.user.id);
    if (error) throw error;
    return (data ?? []).map((r) => r.role as string);
  },
  staleTime: 60_000,
});

/** UI hint only — every staff action is also enforced by the database. */
export function useIsStaff(enabled = true) {
  const { data } = useQuery({ ...myRolesQuery, enabled });
  return !!data?.some((r) => r === "staff" || r === "admin");
}
