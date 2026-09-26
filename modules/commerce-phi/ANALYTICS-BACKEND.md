# Commerce Analytics Backend Contract

The backend accepts normalized Commerce Phi events and persists them idempotently by `siteId + eventType + eventId`.

## Authority boundaries

- Product impressions and outbound clicks are site observations.
- Conversions and commissions require a merchant or affiliate-network report.
- Wallet actions are references to the authoritative wallet ledger; analytics does not mint StarCoins.
- Replaying the same event ID must not create a second event or second commission.

## Minimum endpoints

- `POST /v1/events` — validate and persist one event.
- `POST /v1/events/batch` — validate and persist a bounded batch.
- `GET /v1/summary?siteId=...` — aggregate non-sensitive site metrics.
- `POST /v1/conversions/report` — authenticated merchant/network ingestion path.

The implementation should be deployable behind Cloudflare Worker + D1, but this seed deliberately defines the contract before creating production tables or accepting money-related callbacks.
