-- Fix pg_graphql comment directives to use the correct @graphql() format.
-- The previous migration used {"graphql": {"visible": false}} which pg_graphql ignores.
-- The correct format is E'@graphql({"visible": false})'

DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format(
      'COMMENT ON TABLE public.%I IS E''@graphql({"visible": false})''',
      tbl
    );
  END LOOP;
END $$;