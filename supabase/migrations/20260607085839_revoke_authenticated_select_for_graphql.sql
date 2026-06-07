-- Revoke SELECT from authenticated role on all public tables to prevent
-- GraphQL schema discovery. The REST API (PostgREST) access is maintained
-- through RLS policies which are checked after the role's table-level permissions.
--
-- In Supabase's architecture, the authenticator role SETS ROLE to authenticated
-- for each request. With RLS enabled, the actual row filtering happens at the
-- policy level, so even though authenticated retains other privileges (INSERT, 
-- UPDATE, DELETE), SELECT is specifically revoked to satisfy the GraphQL 
-- visibility requirement.
--
-- Note: This will affect REST API SELECT queries for authenticated users.
-- If SELECT access is needed through the REST API, it should be restored 
-- per-table with explicit grants only where needed, and the GraphQL visibility
-- should instead be managed via @graphql({"visible": false}) comment directives.

DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('REVOKE SELECT ON TABLE public.%I FROM authenticated', tbl);
  END LOOP;
END $$;