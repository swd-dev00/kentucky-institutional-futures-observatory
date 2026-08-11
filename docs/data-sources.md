# KIFO Data Sources

This document defines the initial source strategy. It is deliberately a registry plan rather than a claim that every source has already been integrated.

## Source classes

| Domain | Initial source class | Purpose |
|---|---|---|
| Institutional AI adoption | Kentucky public institutions, agencies, universities, and public-sector procurement/policy records | Detect public signals of AI policy, programs, procurement, partnerships, and institutional use |
| Rural digital access | Federal and Kentucky public broadband/connectivity datasets | Measure geographic access and infrastructure conditions |
| Education | Kentucky education and postsecondary public data | Track enrollment, programs, credentials, and institutional change |
| Workforce | Public labor-market, occupational, and workforce datasets | Track employment, occupation, skill, and training transitions |
| Institutional capacity | Government budgets, public reports, institutional plans, and official program documentation | Connect observed change to investment and institutional response |

## Source-selection rules

A source should enter the production registry only after recording:

- canonical publisher;
- canonical URL;
- source title;
- data/document type;
- geographic scope;
- temporal coverage;
- access method;
- update cadence if known;
- license or reuse restrictions;
- retrieval timestamp;
- known caveats.

## Initial vertical slice

The first working pipeline should intentionally use a small, auditable source set rather than attempting to ingest the entire Kentucky information environment at once.

The acceptance test is not the number of sources. It is whether one complete path can be demonstrated:

**source → retrieval → normalized evidence → validation → indicator → finding → evidence trail.**

## Source provenance

KIFO should preserve both the source's identity and the exact retrieval context used to produce a finding. When source content changes, the system should be able to distinguish a new observation from a revision of an existing one.

## Source gaps

Public records are not a complete representation of institutional activity. KIFO should document coverage gaps explicitly and should never convert source absence into an assertion of institutional absence.
