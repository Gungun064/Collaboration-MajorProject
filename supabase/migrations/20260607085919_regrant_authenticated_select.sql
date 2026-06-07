-- Re-grant SELECT to authenticated role on all public tables.
-- The REST API (PostgREST) requires authenticated to have SELECT for
-- .select() queries to work. GraphQL visibility is managed separately
-- via @graphql({"visible": false}) comment directives already set on all tables.

DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('GRANT SELECT ON TABLE public.%I TO authenticated', tbl);
  END LOOP;
END $$;