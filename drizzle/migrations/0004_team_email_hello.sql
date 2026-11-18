CREATE OR REPLACE FUNCTION public.grant_team_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if lower(new.email) = 'hello@publishplug.com' and new.email_confirmed_at is not null then
    insert into public.user_roles (user_id, role) values (new.id, 'staff') on conflict do nothing;
  end if;
  return new;
end;
$function$;