---
name: translation-workflow
description: Technical documentation translation workflow and quality standards
---

# Technical Documentation Translation Workflow Skill

[日本語版 (Japanese)](./translation-workflow.ja.md)

## Overview

A workflow for translating technical documentation accurately and readably. Combines machine translation with quality evaluation to ensure consistent quality.

## Target Use Cases

- Translation of READMEs and documentation
- Multilingual support for technical articles
- API documentation translation

## MCPs Used

| MCP | Tool | Purpose |
| --- | ------ | ---- |
| deepl | translate-text | Text translation |
| deepl | get-glossary-info | Glossary reference |
| xcomet | xcomet_evaluate | Translation quality score calculation |
| xcomet | xcomet_detect_errors | Error location detection |

## Workflow

### 1. Execute Translation

```
deepl:translate-text for translation
- formality: "more" (for technical documentation)
- preserve_formatting: true
```

If a glossary is available, check it beforehand with `get-glossary-info`.

### 2. Quality Evaluation

```
xcomet:xcomet_evaluate to obtain quality score
```

### 3. Action Based on Results

Determine the next action based on the score.

### 4. Error Detection (If Necessary)

```
xcomet:xcomet_detect_errors to identify problem areas
```

## Decision Criteria

| Condition | Action |
| ---- | ---------- |
| Score >= 0.90 | Use as-is |
| 0.85 <= Score < 0.90 | Consider minor revisions |
| 0.70 <= Score < 0.85 | Adjust parameters and re-translate |
| Score < 0.70 | Significant manual revision required |

## Notes

- Standardize technical terminology using a glossary
- Do not translate content within code blocks
- Preserve proper nouns (product names, etc.) in original language

## References

- [DeepL API Documentation](https://developers.deepl.com/docs)
- [xCOMET MCP Server](https://github.com/shuji-bonji/xcomet-mcp-server)
