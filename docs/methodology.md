# KIFO Methodology

## Research contract

KIFO is an observatory, not a prediction engine. It records evidence about institutional conditions and changes, then derives transparent measures from that evidence.

### Unit of observation

The default unit is an **evidence record**: a dated observation tied to a source, publisher, institution or institutional class, geography, topic, and measurable value or qualitative signal.

### Time

Every observation should preserve:

- source publication date, when available;
- effective period, when the source defines one;
- retrieval timestamp;
- observation period used by the indicator.

These dates must not be collapsed into a single generic "date" because a document published in 2026 may describe conditions from 2024.

### Geography

KIFO should support statewide, county, regional, institutional, and other explicitly defined geographic scopes. Geography must be represented separately from the publisher or institution.

### Evidence hierarchy

For quantitative and institutional claims, KIFO should prefer, in order:

1. primary government datasets and official records;
2. official institutional publications and administrative records;
3. authoritative public research organizations;
4. reputable secondary reporting used to locate or contextualize primary evidence.

Secondary sources should not silently become the evidentiary basis for a claim when a primary source is available.

## Indicator design

Each indicator requires a definition before computation:

- **name** — stable machine-readable identifier;
- **question** — decision or research question addressed;
- **population** — entities included;
- **numerator/measure** — what is counted or measured;
- **denominator** — if applicable;
- **time window** — observation period;
- **geography** — spatial scope;
- **inclusion/exclusion rules** — explicit filtering;
- **source set** — evidence records used;
- **limitations** — known gaps or comparability issues.

An indicator is not considered publication-ready if its denominator, population, or time window cannot be explained.

## Confidence

KIFO should distinguish evidence quality from substantive importance. A high-profile claim can still have weak evidence.

Suggested evidence-quality classes:

- **A — primary, directly measurable:** authoritative source and clear measurement.
- **B — primary, derived:** authoritative source requiring documented transformation.
- **C — secondary/contextual:** credible secondary evidence or synthesis.
- **D — signal only:** useful lead or qualitative signal requiring verification.

The quality class describes the evidence, not whether the claim is true or false.

## Missingness and negative evidence

KIFO must not infer that an institution, county, or sector has no activity merely because an activity was not found in public records.

Where coverage is incomplete, findings should say **"no public signal located in the searched sources"** rather than **"no activity exists."**

## Reproducibility

Every published analytical result should be reproducible from:

1. source identifiers;
2. retrieval dates or snapshots;
3. transformation logic;
4. indicator definition;
5. output version.

Changes to source data or methodology should produce a new version rather than silently rewriting historical findings.

## Publication standard

Before a result is promoted to a KIFO headline, an analyst should be able to answer:

- What exactly was measured?
- Where did the evidence come from?
- What period does it represent?
- What was excluded?
- Can another person reproduce the calculation?
- What could make this conclusion wrong or incomplete?
