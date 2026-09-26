# Reference-site handoff

A reference site is a consumer of Builder Reserve, not a fork of its internal services.

## Santa's Helper

Target repository: `www-infinity4/Santas-Helper`

The first scaffold should establish the mobile-first Christmas shopping shell, page routes, component mount points, public runtime configuration and thin adapters. It should **not** recreate Unified Wallet, StarQuest identity, Commerce Phi, ledger logic, merchant secrets or conversion authority.

The visual layer may evolve freely. Shared capability contracts remain upstream so fixes can benefit every generated site.

## Handoff gate

Before writing the target scaffold:

- Builder Reserve validation must pass.
- The blueprint must resolve its registered shared capabilities.
- Unresolved capabilities must be visible rather than silently replaced.
- No target file may contain authoritative wallet state or secrets.

After scaffold creation, the target repository gets its own smoke checks while continuing to consume the shared contracts.
