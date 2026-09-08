---
name: translation-quality
description: Bilingual (ja/en) documentation translation quality evaluation using xCOMET. The source language is resolved per page pair from .claude/translation.json, not fixed.
version: 1.1.0
owner: @shuji-bonji
last_reviewed: 2026-09-08
---

# Translation Quality Evaluation Skill

## Purpose

Evaluate and ensure high-quality Japanese → English translations using automated quality metrics (xCOMET) with clear decision criteria and actionable outputs.

### Why This Skill?

- Manual translation review is time-consuming and subjective
- xCOMET provides objective, reproducible quality scores
- Clear thresholds enable automated decision-making
- Results can be directly embedded into documentation

## Inputs

| Input | Type | Description |
|-------|------|-------------|
| page pair | two `.md` files | One page in both locales. Resolved from `.claude/translation.json` — see **Pairing and Direction** below |
| source language | `ja` or `en` | Which side of the pair is the original. Resolved per pair, never assumed |
| threshold | number (0-1) | Minimum acceptable score (default: from config, 0.85) |

### Pairing and Direction

This repository keeps locales in **directories**, not filename suffixes: `docs/` is English and `docs/ja/` is Japanese. `docs/ja/part-2/layers.md` pairs with `docs/part-2/layers.md`. Only files listed under `filePairs` (currently `README.ja.md` ↔ `README.md`) use the suffix form.

The original is not always Japanese. `.claude/translation.json` holds `defaultSource` for the repository and a `sourceOverrides` list of globs for pages written the other way round. Resolve the direction per pair before scoring; scoring a translation as if it were the source inverts the metric.

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| quality_report | Markdown | Embeddable report with scores and recommendations |
| segment_details | Table | Per-segment scores and issues |
| action_items | List | Specific corrections needed |

## Constraints

### MUST

- Use `xcomet:xcomet_batch_evaluate` for multi-segment evaluation
- Read `.claude/translation.json` before scoring, and set `source_lang` / `target_lang` from the direction resolved for that pair
- Generate report in embeddable Markdown format
- Include both summary and detailed segment scores

### SHOULD

- Evaluate at least 10 representative segments per document
- Include segment text in reports for segments scoring < 0.90
- Use `deepl:translate-text` for re-translation when `--fix` is specified

### MUST NOT

- Mark documents as "Excellent" if any segment scores < 0.85
- Edit the source side of a pair to raise a score. Only the translation side is revised
- Lower `threshold` or add a `sourceOverrides` entry to make a failing pair pass
- Skip segments containing only code blocks
- Include raw JSON in final report (format as Markdown tables)

## Workflow

### Step 1: File Detection

```
Resolve pairs from .claude/translation.json
- localeRoots: docs/ja/X  <->  docs/X   (English side is docs/ excluding docs/ja/)
- filePairs:   explicit pairs such as README.ja.md <-> README.md
- exclude:     glob list to skip (redirect stubs, .vitepress, public)
- If a single file is given, find its counterpart on the other side
- If a directory is given, walk it and collect every pair
Then resolve the direction: defaultSource, overridden by sourceOverrides globs
```

### Step 2: Segment Extraction

```
Extract translatable segments from both files:
1. Document title (# heading)
2. Section headings (## / ### headings)
3. Key paragraphs (first 2-3 sentences per section)
4. Table content
5. List items with substantive content

Skip:
- Code blocks (```)
- URLs and links
- Mermaid diagrams
- Pure formatting elements
```

### Step 3: Quality Evaluation

```
Call xCOMET MCP with extracted pairs:

mcp: xcomet
tool: xcomet_batch_evaluate
params:
  pairs: [{ source: "日本語", translation: "English" }, ...]
  source_lang: "<resolved source>"   # ja or en, per pair
  target_lang: "<the other side>"
  response_format: "markdown"
```

### Step 4: Result Classification

Apply decision criteria to scores and generate report.

### Step 5: Report Generation

Output embeddable Markdown with:
- Summary table
- Quality criteria reference
- Segment details (for scores < 0.95)
- Recommendations

## Decision Criteria

| Condition | Action | Rationale |
|-----------|--------|-----------|
| Average ≥ 0.95 | ✅ Excellent - Publish | Professional quality |
| 0.90 ≤ Average < 0.95 | ✅ Good - Minor review | May benefit from polish |
| 0.85 ≤ Average < 0.90 | ⚠️ Review required | Check flagged segments |
| 0.70 ≤ Average < 0.85 | 🔄 Re-translate | Parameter adjustment needed |
| Average < 0.70 | ❌ Manual revision | Significant issues present |

### Per-Segment Criteria

| Score | Label | Action |
|-------|-------|--------|
| ≥ 0.95 | Excellent | No action needed |
| 0.90-0.94 | Good | Review if time permits |
| 0.85-0.89 | Acceptable | Consider revision |
| < 0.85 | Problematic | Must revise |

## Examples

### Example 1: Single File Evaluation

**Input:**

```
/check-translation docs/skills/overview.md
```

**Process:**

1. Resolve pair: `docs/ja/skills/overview.md` ↔ `docs/skills/overview.md`, source `ja`
2. Extract 15 segments
3. Call `xcomet:xcomet_batch_evaluate`
4. Average score: 0.978
5. Generate report

**Output:**

```markdown
## Translation Quality Report

### Summary

| Metric | Value |
|--------|-------|
| Files checked | 1 |
| Segments evaluated | 15 |
| Average score | **0.978** |
| Status | ✅ Excellent |

### Quality Criteria

| Score | Rating | Action |
|-------|--------|--------|
| ≥ 0.95 | Excellent | Publish |
| 0.90-0.94 | Good | Minor review |
| 0.85-0.89 | Acceptable | Review |
| < 0.85 | Problematic | Revise |

### Segment Details

All 15 segments scored ≥ 0.95. No issues detected.

### Recommendation

✅ Ready for publication without changes.
```

### Example 2: Directory Batch Evaluation

**Input:**

```
/check-translation docs/
```

**Process:**

1. Find 8 file pairs in `docs/`
2. Extract 40 total segments
3. Batch evaluate all segments
4. Generate comprehensive report

**Output:**

```markdown
## Translation Quality Report

### Summary

| Metric | Value |
|--------|-------|
| Files checked | 8 |
| Segments evaluated | 40 |
| Average score | **0.972** |
| Status | ✅ Excellent |
| Critical errors | 0 |

### Per-File Results

| File | Score | Status |
|------|-------|--------|
| README.md | 0.975 | ✅ Excellent |
| concepts/01-vision.md | 0.978 | ✅ Excellent |
| skills/anti-patterns.md | 0.957 | ✅ Excellent |
| workflows/patterns.md | 0.977 | ✅ Excellent |

### Segments Needing Attention (< 0.95)

| Source | Translation | Score |
|--------|-------------|-------|
| MCPサーバーの開発・運用... | Organizing security risks... | 0.898 |

### Recommendation

✅ Overall excellent quality. Optional: Review 1 segment above.
```

## Anti-Patterns

### Pattern: Raw Score Reporting

**Problematic Approach:**

```
Score: 0.9750812888145447
```

**Why It's Problematic:** Overly precise numbers suggest false accuracy

**Correct Approach:**

```
Score: **0.975** (Excellent)
```

### Pattern: Missing Context

**Problematic Approach:**

```
3 segments below threshold
```

**Why It's Problematic:** Reviewer cannot act without seeing the text

**Correct Approach:**

```
| Source | Translation | Score |
|--------|-------------|-------|
| 実際のテキスト | Actual text | 0.84 |
```

## Related MCPs

| MCP | Usage | Required |
|-----|-------|----------|
| xcomet-mcp-server | xcomet_batch_evaluate, xcomet_evaluate | Required |
| deepl-mcp | translate-text (for --fix option) | Optional |

## References

- [xCOMET MCP Server](https://github.com/shuji-bonji/xcomet-mcp-server)
- [Translation Workflow Pattern](../../../docs/workflows/patterns.md#pattern-1-technical-document-translation-workflow)
- [Translation Workflow Skill Example](../../../templates/skill/examples/translation-workflow.md)
