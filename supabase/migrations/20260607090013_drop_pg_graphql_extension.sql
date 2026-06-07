-- Drop the pg_graphql extension to eliminate GraphQL schema visibility.
-- This app only uses the REST API (supabase.from()), not GraphQL.
-- Removing the extension ensures no tables are discoverable via GraphQL
-- introspection by either anon or authenticated roles.
-- The graphql and graphql_public schemas will be cascade-dropped with the extension.

DROP EXTENSION IF EXISTS pg_graphql CASCADE;