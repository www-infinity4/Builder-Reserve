# Unified Site Builder Seeds

This repository area defines the reusable capabilities that one Infinity site builder should plant into generated sites. The goal is simple: **build a capability once, then compose it everywhere.**

## Builder contract

A generated site owns its theme, words, layout and site-specific recommendation behavior. Shared modules own identity, wallet persistence, ledger rules, commerce attribution, merchant adapters and analytics.

The builder must not regenerate a new wallet for each site. It consumes [Unified-Wallet](https://github.com/www-infinity4/Unified-Wallet) and uses the authoritative StarQuest/D1 ledger. Frontend redeploys must never reset a balance.

## Seed modules

1. **Unified Wallet** — common wallet UI/API and authoritative cloud-backed balance.
2. **Identity** — shared StarQuest session/device identity.
3. **Actions** — Share/Collect/Watch/Search events use stable IDs and server-defined rewards.
4. **Product Search** — current merchant products, media, price and availability.
5. **Affiliate Attribution** — records impressions and outbound clicks; merchant/network confirmation is authoritative for sales/commission.
6. **Product Cards** — reusable card with product media, explanation, merchant link, Share/Collect and disclosure.
7. **Merchant Adapters** — retailer-specific integration behind one interface.
8. **Analytics** — impressions, clicks, reported conversions, commissions and wallet events.
9. **Disclosure/Privacy** — clear affiliate/ad disclosure and privacy surface.

## Santa's Helper reference build

Santa's Helper should be the first commerce reference site. It should compose these seeds rather than implement another wallet or another attribution ledger. Purchases initially stay on merchant checkout pages through tracked affiliate links; Santa's Helper does not need to hold card data.

## Current integration checkpoint

Unified-Wallet has a validated StarQuest share receipt contract. Control Phi still contains local fallback StarCoin credit logic; that fallback must be migrated so StarQuest/D1 is the only balance authority before calling the cross-site wallet complete.

The machine-readable contract lives at `seeds/site-builder.json`.
