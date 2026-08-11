"""Validation primitives for KIFO evidence records."""

from __future__ import annotations

from datetime import datetime
from urllib.parse import urlparse


QUALITY_CLASSES = {"A", "B", "C", "D"}
GEOGRAPHY_LEVELS = {"state", "region", "county", "institution", "other"}
AUTHORITY_CLASSES = {"primary", "institutional", "research", "secondary", "signal"}


def _require_mapping(record: object) -> dict:
    if not isinstance(record, dict):
        raise ValueError("evidence record must be an object")
    return record


def _require_nonempty_string(value: object, field: str) -> None:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{field} must be a non-empty string")


def _validate_url(value: object) -> None:
    _require_nonempty_string(value, "source.url")
    parsed = urlparse(value)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError("source.url must be an HTTP(S) URL")


def _validate_date(value: object, field: str) -> None:
    _require_nonempty_string(value, field)
    try:
        datetime.fromisoformat(value)
    except ValueError as exc:
        raise ValueError(f"{field} must be an ISO-8601 date or datetime") from exc


def validate_evidence_record(record: object) -> None:
    """Raise ValueError when a record violates KIFO's core evidence contract."""
    record = _require_mapping(record)

    for field in ("id", "source", "observation", "scope", "provenance"):
        if field not in record:
            raise ValueError(f"missing required field: {field}")

    source = _require_mapping(record["source"])
    for field in ("publisher", "title", "url"):
        if field not in source:
            raise ValueError(f"missing required source field: {field}")
    _require_nonempty_string(source["publisher"], "source.publisher")
    _require_nonempty_string(source["title"], "source.title")
    _validate_url(source["url"])
    if source.get("authority_class") not in AUTHORITY_CLASSES:
        raise ValueError("source.authority_class must be a supported evidence class")

    observation = _require_mapping(record["observation"])
    _require_nonempty_string(observation.get("topic"), "observation.topic")
    for field in ("publication_date", "period_start", "period_end"):
        if field in observation:
            _validate_date(observation[field], f"observation.{field}")

    scope = _require_mapping(record["scope"])
    if "geography_level" in scope and scope["geography_level"] not in GEOGRAPHY_LEVELS:
        raise ValueError("scope.geography_level must be a supported geography level")

    provenance = _require_mapping(record["provenance"])
    _validate_date(provenance.get("retrieved_at"), "provenance.retrieved_at")
    if provenance.get("evidence_quality") not in QUALITY_CLASSES:
        raise ValueError("provenance.evidence_quality must be A, B, C, or D")
