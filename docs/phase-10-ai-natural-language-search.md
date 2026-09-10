# Phase 10: AI-Powered Indoor Navigation & Natural Language Search

## Built
- Optional AI/NLP backend module that does deterministic intent parsing first.
- Natural-language query endpoint.
- Intent types: find location, navigate to location, nearest facility.
- Room, facility, and department resolution from natural-language queries.
- Route calculation when a current node and navigable destination are available.
- Frontend smart-search panel.

## Endpoint
- `POST /api/ai/query`

## Reliability Rule
The core app does not depend on external AI. This phase uses deterministic NLP parsing and database lookup. If a future LLM provider is configured, it should only parse intent and must never invent locations.
