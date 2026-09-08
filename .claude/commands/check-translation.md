# /check-translation

Evaluate translation quality between the two locales of this site using xCOMET. The source language is resolved per page pair from `.claude/translation.json`; it is not assumed to be Japanese.

## Usage

```
/check-translation <path> [options]
```

## Arguments

| Argument | Description | Example |
|----------|-------------|---------|
| `<path>` | File or directory to check, in either locale | `docs/ja/part-2/` |

## Options

| Option | Description |
|--------|-------------|
| `--pair <file>` | Specify the counterpart file explicitly, when automatic resolution fails |
| `--source <ja\|en>` | Force the source language for this run, overriding the config |
| `--threshold <score>` | Custom quality threshold (default: from config, 0.85) |
| `--fix` | Attempt to fix low-scoring segments with DeepL. Only the translation side is edited |

## Pairing and Direction

Locales live in **directories**, not filename suffixes.

| Config key | Meaning |
|---|---|
| `localeRoots` | `docs/ja` is Japanese, `docs` is English. `docs/ja/part-2/layers.md` pairs with `docs/part-2/layers.md`. The English side is `docs/` **excluding** `docs/ja/` |
| `filePairs` | Explicit pairs that do not follow the directory rule, such as `README.ja.md` ↔ `README.md` |
| `exclude` | Globs to skip: redirect stubs under `concepts/`, `.vitepress/`, `public/` |
| `defaultSource` | Which side is the original by default (`ja` for this repository) |
| `sourceOverrides` | Globs for pages written the other way round. These win over `defaultSource` |
| `threshold` | Minimum acceptable segment score |
| `maxFixRounds` | How many times a page may be revised before escalating to a human |

Resolve the direction **before** scoring. xCOMET compares a translation against its source; passing the translated side as the source inverts the metric and the resulting numbers mean nothing.

## Workflow

This command uses the `translation-quality` skill and performs:

1. **Resolve pairs**: Read `.claude/translation.json` and map the given path to its counterpart, then resolve which side is the source
2. **Extract segments**: Parse markdown and extract translatable text blocks
3. **Evaluate**: Call `xcomet:xcomet_evaluate` or `xcomet:xcomet_batch_evaluate` with the resolved `source_lang` / `target_lang`
4. **Report**: Generate quality report with scores and recommendations
5. **Fix (optional)**: Re-translate low-scoring segments with `deepl:translate-text`

## Examples

### Check a single page pair

```
/check-translation docs/ja/part-2/layers.md
```

### Check every page under a section

```
/check-translation docs/ja/skills/
```

### Force the direction for a page written in English first

```
/check-translation docs/reference-selection-checklist.md --source en
```

### Check with custom threshold and auto-fix

```
/check-translation docs/ --threshold 0.90 --fix
```

### Check the README pair

```
/check-translation README.ja.md
```

## Output Format

```
## Translation Quality Report

### Summary
- Files checked: 5
- Average score: 94.2%
- Status: ✅ Ready for publication

### Details

| File | Score | Status | Issues |
|------|-------|--------|--------|
| README.md | 97.3% | ✅ Excellent | - |
| overview.md | 96.3% | ✅ Excellent | - |
| anti-patterns.md | 78.1% | ⚠️ Review | 2 minor |

### Recommendations
- anti-patterns.md: Consider revising section "over-MCPization"
```

## Quality Thresholds

Refer to `translation-quality` skill for detailed criteria:

| Score | Action |
|-------|--------|
| ≥ 0.95 | ✅ Excellent - Publish |
| 0.85-0.94 | ✅ Good - Minor review |
| 0.70-0.84 | ⚠️ Review required |
| < 0.70 | ❌ Re-translate |

## Related

- Config: `.claude/translation.json`
- Skill: `.claude/skills/translation-quality/SKILL.md`
- Loop: `.claude/loop.md` — runs this command unattended as a quality gate
- MCP: `xcomet:xcomet_evaluate`, `xcomet:xcomet_batch_evaluate`, `deepl:translate-text`
- Docs: `docs/workflows/patterns/translation.md`, `docs/workflows/translation-quality-loop.md`
