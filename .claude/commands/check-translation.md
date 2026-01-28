# /check-translation

Evaluate translation quality of Japanese → English documents using xCOMET.

## Usage

```
/check-translation <path> [options]
```

## Arguments

| Argument | Description | Example |
|----------|-------------|---------|
| `<path>` | File or directory to check | `docs/skills/` |

## Options

| Option | Description |
|--------|-------------|
| `--ja <file>` | Specify Japanese source file explicitly |
| `--threshold <score>` | Custom quality threshold (default: 0.85) |
| `--fix` | Attempt to fix low-quality translations with DeepL |

## Workflow

This command uses the `translation-quality` skill and performs:

1. **Detect pairs**: Find `.ja.md` ↔ `.md` file pairs in the specified path
2. **Extract segments**: Parse markdown and extract translatable text blocks
3. **Evaluate**: Call `xcomet:xcomet_evaluate` or `xcomet:xcomet_batch_evaluate`
4. **Report**: Generate quality report with scores and recommendations
5. **Fix (optional)**: Re-translate low-scoring segments with `deepl:translate-text`

## Examples

### Check a single file pair

```
/check-translation README.md --ja README.ja.md
```

### Check all documents in a directory

```
/check-translation docs/skills/
```

### Check with custom threshold and auto-fix

```
/check-translation docs/ --threshold 0.90 --fix
```

### Check specific sections

```
/check-translation docs/concepts/03-architecture.md
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

- Skill: `.claude/skills/translation-quality/SKILL.md`
- MCP: `xcomet:xcomet_evaluate`, `xcomet:xcomet_batch_evaluate`
- Docs: `docs/workflows/patterns.md` (Pattern 1 & 2)
