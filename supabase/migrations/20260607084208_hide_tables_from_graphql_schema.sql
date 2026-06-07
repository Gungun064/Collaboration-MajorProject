-- Hide all public tables from the GraphQL schema using pg_graphql comment directives.
-- This prevents the tables from being discoverable via GraphQL introspection
-- while preserving REST API access (supabase.from()) for the authenticated role.

DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format(
      'COMMENT ON TABLE public.%I IS $dir${"graphql": {"visible": false}}$dir$',
      tbl
    );
  END LOOP;
END $$;