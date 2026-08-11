# Kentucky Institutional Futures Observatory (KIFO)

KIFO is an evidence-oriented observatory for understanding how Kentucky institutions are adapting to technological, workforce, educational, and civic change.

The project is designed around a simple rule: **claims must be traceable to public evidence.** KIFO should make it possible to move from a statewide question to a reproducible finding, with source provenance, methodology, limitations, and publication artifacts preserved.

## Initial scope

KIFO will initially monitor four connected domains:

1. **Institutional AI adoption** — public signals of AI policy, programs, procurement, workforce use, and institutional capability.
2. **Rural digital access** — broadband, connectivity, infrastructure, and access disparities that shape institutional and workforce capacity.
3. **Education and workforce transitions** — changes in credentials, programs, occupations, skills, and training demand.
4. **Institutional capacity and response** — how Kentucky institutions respond through policy, investment, partnerships, and public programs.

The first release is intentionally an observatory foundation, not a claim that the statewide system has already been completely measured.

## Design principles

- **Evidence before narrative.** Every published finding should point to source records.
- **Reproducibility.** A finding should be regenerable from versioned inputs and documented transformations.
- **Temporal awareness.** Institutional conditions change; observations carry dates and effective periods.
- **Separation of observation and interpretation.** Raw evidence, derived indicators, and analyst conclusions remain distinct.
- **Public-source first.** The initial system prioritizes authoritative public datasets, reports, policies, filings, and institutional publications.
- **Auditability.** Source URL, publisher, retrieval date, document date, transformation, and confidence belong in the evidence record.
- **Responsible inference.** Absence of a public signal is not treated as proof that an institution has no activity.

## Repository structure

```text
.
├── README.md
├── LICENSE
├── docs/
│   ├── architecture.md
│   ├── methodology.md
│   ├── data-sources.md
│   └── roadmap.md
└── schemas/
    └── evidence-record.schema.json
```

## What counts as a KIFO finding?

A KIFO finding is not simply a statistic. A publishable finding should contain:

- a clearly stated question;
- a defined population, geography, and time window;
- source records with provenance;
- an explicit transformation or analytical method;
- uncertainty or limitations where relevant;
- a result that another analyst can inspect and reproduce.

## Current status

**Phase: Foundation / pre-release.**

The repository currently establishes the research contract and architecture. Data ingestion, validation, derived indicators, and public reporting are the next implementation layers.

KIFO should not be presented as a completed statewide observatory until those layers are operational and backed by reproducible evidence.

## License

See [LICENSE](LICENSE).
