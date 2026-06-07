-- Revoke ALL privileges from anon role on all public tables
-- anon should have zero direct table access; data is only accessible
-- through RLS policies for authenticated users

DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM anon', tbl);
  END LOOP;
END $$;