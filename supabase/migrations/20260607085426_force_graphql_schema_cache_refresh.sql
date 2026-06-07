-- Force pg_graphql schema cache refresh by making a minor DDL change.
-- The @graphql({"visible": false}) comment directives are already set,
-- but pg_graphql may have cached the old schema before the comments were applied.

-- Add and immediately remove a harmless comment on a column to trigger
-- the schema_version increment trigger
COMMENT ON COLUMN public.profiles.id IS 'force schema refresh';
COMMENT ON COLUMN public.profiles.id IS NULL;