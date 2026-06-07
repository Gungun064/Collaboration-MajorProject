-- Remove the @graphql comment directives since pg_graphql extension is gone.
-- These comments are no longer needed and should be cleaned up.

DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('COMMENT ON TABLE public.%I IS NULL', tbl);
  END LOOP;
END $$;