# Coordinated physical-token network

This seed models a physical serialized token as a pointer to an authoritative entitlement record, rather than placing mutable financial truth on an NFC chip.

A register may read the token ID, verify issuer/signature information, request current entitlement state, and—where the merchant and holder have opted in—perform a permitted redemption or routing action.

The architecture deliberately separates face value, material value, market price and redemption entitlement. Those values can differ and must not be presented as interchangeable or guaranteed.

Location, itinerary and identity data should be minimized. A random cash register must never learn a traveler's private route merely because it scans a token.
