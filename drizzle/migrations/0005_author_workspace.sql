-- 1. Authors can start their paid book (ordered -> content) and approve deliverables (review -> publishing).
CREATE OR REPLACE FUNCTION public.guard_project_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  new.updated_at := now();
  if new.owner_id is distinct from old.owner_id and not public.is_staff(auth.uid()) then
    raise exception 'Cannot change the owner of a project';
  end if;
  if new.stage is distinct from old.stage and not public.is_staff(auth.uid()) then
    if old.stage = 'ordered' and new.stage = 'content' then
      return new;
    end if;
    if old.stage = 'review' and new.stage = 'publishing' then
      if exists (
        select 1 from public.project_files
        where project_id = new.id
          and kind in ('transcript','cover','interior','epub','audio_final')
          and coalesce(review_status, 'pending') <> 'approved') then
        raise exception 'Approve every file from the team before moving to publishing';
      end if;
      if not exists (
        select 1 from public.project_files
        where project_id = new.id and kind in ('transcript','cover','interior','epub','audio_final')) then
        raise exception 'There are no files from the team to approve yet';
      end if;
      return new;
    end if;
    if not (old.stage in ('draft','quoted') and new.stage in ('draft','quoted','ordered')) then
      raise exception 'Only Publish Plug staff can move a book to this stage';
    end if;
    if new.stage = 'ordered' then
      if coalesce(current_setting('app.paying', true), '') <> 'on' then
        raise exception 'Please pay for your order to place it';
      end if;
      if not exists (select 1 from public.orders where project_id = new.id) then
        raise exception 'Add at least one service before placing the order';
      end if;
      if exists (select 1 from public.orders where project_id = new.id and price is null) then
        raise exception 'Some services are waiting for a custom quote from our team';
      end if;
      if new.source_type = 'monograph' and not new.rights_confirmed then
        raise exception 'Please confirm you hold the rights to this monograph';
      end if;
      if new.source_type = 'interview' and not exists (
        select 1 from public.project_files where project_id = new.id and kind = 'consent') then
        raise exception 'Please upload a consent form for each interviewee';
      end if;
    end if;
  end if;
  return new;
end;
$function$;

-- 2. Deliverable reviews on files.
ALTER TABLE public.project_files ADD COLUMN IF NOT EXISTS review_status text;
ALTER TABLE public.project_files ADD COLUMN IF NOT EXISTS review_note text;
ALTER TABLE public.project_files ADD COLUMN IF NOT EXISTS reviewed_at timestamptz;
ALTER TABLE public.project_files ADD CONSTRAINT project_files_review_status_check
  CHECK (review_status IS NULL OR review_status IN ('pending','approved','changes'));

GRANT UPDATE ON public.project_files TO authenticated;

CREATE POLICY "Owner or staff review files" ON public.project_files
  FOR UPDATE TO authenticated
  USING (public.is_project_owner(project_id) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_project_owner(project_id) OR public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.guard_file_update()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if public.is_staff(auth.uid()) then
    return new;
  end if;
  if new.project_id is distinct from old.project_id or new.kind is distinct from old.kind
     or new.name is distinct from old.name or new.storage_path is distinct from old.storage_path
     or new.size_bytes is distinct from old.size_bytes or new.version is distinct from old.version
     or new.uploaded_by is distinct from old.uploaded_by or new.created_at is distinct from old.created_at then
    raise exception 'Authors can only review files';
  end if;
  if old.kind not in ('transcript','cover','interior','epub','audio_final') then
    raise exception 'Only files from the team can be reviewed';
  end if;
  new.reviewed_at := now();
  return new;
end;
$function$;

CREATE TRIGGER guard_file_update BEFORE UPDATE ON public.project_files
  FOR EACH ROW EXECUTE FUNCTION public.guard_file_update();

-- 3. Manuscript (in-app writing editor, autosaved).
CREATE TABLE public.manuscripts (
  project_id uuid PRIMARY KEY REFERENCES public.projects(id) ON DELETE CASCADE,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  word_count integer NOT NULL DEFAULT 0,
  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.manuscripts TO authenticated;
GRANT ALL ON public.manuscripts TO service_role;
ALTER TABLE public.manuscripts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owner or staff read manuscript" ON public.manuscripts
  FOR SELECT TO authenticated USING (public.is_project_owner(project_id) OR public.is_staff(auth.uid()));
CREATE POLICY "Owner or staff start manuscript" ON public.manuscripts
  FOR INSERT TO authenticated WITH CHECK (public.is_project_owner(project_id) OR public.is_staff(auth.uid()));
CREATE POLICY "Owner or staff edit manuscript" ON public.manuscripts
  FOR UPDATE TO authenticated
  USING (public.is_project_owner(project_id) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_project_owner(project_id) OR public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.touch_writing()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$function$;
CREATE TRIGGER touch_manuscript BEFORE INSERT OR UPDATE ON public.manuscripts
  FOR EACH ROW EXECUTE FUNCTION public.touch_writing();

-- 4. Book brief (what the author wants; essential for ghostwriting).
CREATE TABLE public.book_briefs (
  project_id uuid PRIMARY KEY REFERENCES public.projects(id) ON DELETE CASCADE,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  submitted_at timestamptz,
  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.book_briefs TO authenticated;
GRANT ALL ON public.book_briefs TO service_role;
ALTER TABLE public.book_briefs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owner or staff read brief" ON public.book_briefs
  FOR SELECT TO authenticated USING (public.is_project_owner(project_id) OR public.is_staff(auth.uid()));
CREATE POLICY "Owner or staff start brief" ON public.book_briefs
  FOR INSERT TO authenticated WITH CHECK (public.is_project_owner(project_id) OR public.is_staff(auth.uid()));
CREATE POLICY "Owner or staff edit brief" ON public.book_briefs
  FOR UPDATE TO authenticated
  USING (public.is_project_owner(project_id) OR public.is_staff(auth.uid()))
  WITH CHECK (public.is_project_owner(project_id) OR public.is_staff(auth.uid()));
CREATE TRIGGER touch_brief BEFORE INSERT OR UPDATE ON public.book_briefs
  FOR EACH ROW EXECUTE FUNCTION public.touch_writing();