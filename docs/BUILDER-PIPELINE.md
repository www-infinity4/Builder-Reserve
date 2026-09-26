# Unified Site Builder pipeline

The builder follows one deterministic sequence:

1. Read a site blueprint.
2. Read the shared module registry.
3. Resolve existing modules and their dependencies.
4. Assemble pages from the component registry.
5. Report unresolved capabilities instead of silently inventing replacements.
6. Generate only site-specific layout/copy/adapters that remain unresolved.
7. Validate money authority, secrets, disclosure, capability ownership and other build checks.
8. Emit the generated-site manifest and files.
9. Deploy the frontend while preserving cloud-backed wallet/commerce state.

## Rebuild rule

A rebuild repeats the pipeline against the latest registered modules. It does **not** copy wallet, identity, ledger, attribution or merchant-module internals into the generated site.

## Reference target

Santa's Helper is the first reference output. Its blueprint is `blueprints/santas-helper.json`. Once the reusable seed sequence is complete, its repository should receive the generated-site skeleton and site-specific Christmas presentation layer.
