---
name: translation-quality
description: Translation quality check workflow and criteria using xCOMET
version: 1.0.0
owner: "@shuji-bonji"
last_reviewed: 2026-01-28
---

# Translation Quality Check Skill

## Purpose

Ensure high-quality translations from Japanese to English for documentation and technical content. This skill provides standardized criteria and workflows for evaluating and improving translation quality.

### Why This Skill?

- Consistent quality standards across all translated documents
- Automated quality gates before publication
- Clear remediation workflow for low-quality translations

## MCP Tools

| MCP | Tool | Purpose |
|-----|------|---------|
| xcomet | xcomet_evaluate | Calculate quality score for single pair |
| xcomet | xcomet_detect_errors | Detect error spans with severity |
| xcomet | xcomet_batch_evaluate | Evaluate multiple pairs efficiently |
| deepl | translate-text | Re-translate if quality is poor |

## Quality Criteria

| Score | Rating | Action |
|-------|--------|--------|
| 0.95+ | ⭐⭐⭐⭐⭐ Excellent | Ready for publication |
| 0.85-0.94 | ⭐⭐⭐⭐ Good | Minor review recommended |
| 0.70-0.84 | ⭐⭐⭐ Acceptable | Review and improve required |
| < 0.70 | ⭐⭐ Poor | Re-translation required |

## Workflow

### Step 1: Identify Translation Pairs

Locate source (Japanese) and target (English) document pairs:

```
docs/skills/overview.ja.md  ←→  docs/skills/overview.md
README.ja.md                ←→  README.md
```

### Step 2: Evaluate Quality

For single documents:
```
xcomet:xcomet_evaluate
  - source: Japanese text
  - translation: English text
  - source_lang: ja
  - target_lang: en
```

For multiple documents (5+ pairs):
```
xcomet:xcomet_batch_evaluate
  - pairs: [{source, translation}, ...]
  - source_lang: ja
  - target_lang: en
```

### Step 3: Analyze Results

If score < 0.85:
```
xcomet:xcomet_detect_errors
  - source: Japanese text
  - translation: English text
  - min_severity: minor
```

### Step 4: Remediate

| Condition | Action |
|-----------|--------|
| Score < 0.70 | Re-translate with deepl:translate-text |
| Score 0.70-0.84 with errors | Fix specific error spans |
| Score 0.85+ with minor issues | Optional refinement |

## Decision Criteria

| Condition | Action | Rationale |
|-----------|--------|-----------|
| All scores ≥ 0.95 | Approve for publication | Excellent quality |
| Average ≥ 0.85, no critical errors | Approve with notes | Good enough quality |
| Any score < 0.70 | Block publication | Quality gate failure |
| Critical errors detected | Manual review required | Semantic issues |

## Examples

### Example 1: Single Document Check

**Input:**
```
Source (JA): MCPだけでは不十分
Translation (EN): MCP alone is not enough
```

**Process:**
1. Call xcomet_evaluate with source_lang=ja, target_lang=en
2. Score: 0.973 (Excellent)
3. Result: Ready for publication

### Example 2: Batch Check

**Input:**
```json
[
  {"source": "設計思想", "translation": "Design principles"},
  {"source": "実践ノウハウ", "translation": "Practical knowledge"}
]
```

**Process:**
1. Call xcomet_batch_evaluate
2. Average: 0.95+
3. Result: All pairs ready

### Example 3: Low Quality Detection

**Input:**
```
Source (JA): エージェント側でのカスタマイズが困難
Translation (EN): Customization difficult agent side
```

**Process:**
1. xcomet_evaluate → Score: 0.65 (Poor)
2. xcomet_detect_errors → Grammar issues detected
3. Re-translate with deepl
4. Re-evaluate → Score: 0.92 (Good)

## Anti-Patterns

### ❌ Skipping Batch Evaluation

**Problematic:**
```
# Evaluating 20 pairs one by one
for each pair:
    xcomet_evaluate(pair)  # Inefficient
```

**Correct:**
```
# Use batch for 5+ pairs
xcomet_batch_evaluate(all_pairs)  # Efficient
```

### ❌ Ignoring Error Severity

**Problematic:**
```
Score is 0.80, no errors shown → Approve
```

**Correct:**
```
Score is 0.80 → Run xcomet_detect_errors
Check for critical/major errors before approval
```

## Related MCPs

| MCP | Usage | Required |
|-----|-------|----------|
| xcomet | Quality evaluation | Required |
| deepl | Re-translation | Recommended |

## References

- [xCOMET MCP Server](https://github.com/shuji-bonji/xcomet-mcp-server)
- [DeepL MCP](https://github.com/anthropics/claude-code-deepl)
- [Translation Workflow Pattern](../../docs/workflows/patterns.md)
