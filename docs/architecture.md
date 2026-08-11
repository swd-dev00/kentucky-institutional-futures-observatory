# KIFO Architecture

## System objective

KIFO converts heterogeneous public evidence into dated, provenance-preserving institutional observations and derived indicators that can support public briefs, dashboards, and research.

```text
Public sources
    |
    v
Source registry + retrieval
    |
    v
Raw evidence / snapshots
    |
    v
Normalization + validation
    |
    v
Evidence records
    |
    +--------------------+
    |                    |
    v                    v
Derived indicators   Evidence index
    |                    |
    +---------+----------+
              v
       Analysis products
       /      |       \
      v       v        v
   briefs  dashboard  datasets
```

## Layers

### 1. Source registry

A machine-readable inventory of sources. Each source should identify:

- publisher;
- dataset or document name;
- domain;
- geographic coverage;
- update cadence, when known;
- canonical URL;
- retrieval method;
- licensing/access constraints;
- expected fields or document structure;
- source authority notes.

### 2. Retrieval and snapshots

Retrieval should preserve the source artifact or a content-addressable representation whenever legally and technically appropriate. Each retrieval receives a timestamp and source fingerprint so later changes can be detected.

### 3. Normalization and validation

Source-specific transformations map heterogeneous material into KIFO's common evidence model. Validation should reject malformed records and flag missing provenance, invalid dates, unsupported geography, and impossible values.

### 4. Evidence record

The evidence record is the canonical unit connecting a source observation to an institution, geography, time period, and topic. See `schemas/evidence-record.schema.json`.

### 5. Derived indicators

Indicators are calculated only from validated evidence records. Every indicator definition should specify its formula, denominator, inclusion/exclusion rules, time window, and known limitations.

### 6. Publication layer

The publication layer converts validated indicators and evidence into human-readable outputs. Published claims must retain links back to their underlying evidence and methodology.

## Architectural boundary

KIFO separates **collection**, **measurement**, and **interpretation**.

- Collection answers: *What did a source publish or report?*
- Measurement answers: *What can be calculated consistently from those observations?*
- Interpretation answers: *What does the measured pattern potentially mean?*

This separation is important because institutional change is difficult to measure and public records are incomplete.

## Initial implementation strategy

The first executable release should be deliberately small:

1. establish a source registry;
2. ingest a limited set of authoritative Kentucky-relevant sources;
3. produce normalized evidence records;
4. validate records automatically;
5. calculate a small number of transparent indicators;
6. publish one reproducible research brief;
7. expose the evidence trail behind every headline result.

The architecture can expand after this vertical slice works end-to-end.
