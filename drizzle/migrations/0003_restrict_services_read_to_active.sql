DROP POLICY IF EXISTS "Anyone can view services" ON public.services;

CREATE POLICY "Anyone can view active services"
ON public.services
FOR SELECT
TO anon, authenticated
USING (active = true);

CREATE POLICY "Staff view all services"
ON public.services
FOR SELECT
TO authenticated
USING (public.is_staff(auth.uid()));

CREATE POLICY "Authors view services on their orders"
ON public.services
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.orders o
  WHERE o.service_code = services.code
    AND public.is_project_owner(o.project_id)
));