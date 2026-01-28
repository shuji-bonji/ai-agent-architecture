# Project Skills Index

This project provides AI agent skills for documentation and translation workflows.

## Available Skills

| Skill | Description | Command |
|-------|-------------|---------|
| [translation-quality](./translation-quality/SKILL.md) | JA→EN translation quality evaluation using xCOMET | `/check-translation` |

## Quick Start

### Translation Quality Check

```
/check-translation docs/           # Check all documents
/check-translation README.md       # Check single file
/check-translation docs/ --fix     # Auto-fix low quality
```

**Quality Criteria:**

| Score | Action |
|-------|--------|
| ≥ 0.95 | ✅ Publish |
| 0.85-0.94 | ✅ Minor review |
| < 0.85 | ⚠️ Review/Re-translate |

**Required MCP:** `xcomet-mcp-server`

→ [Full documentation](./translation-quality/SKILL.md)

## Adding Skills

```bash
cp templates/skill/SKILL.md.template .claude/skills/my-skill/SKILL.md
```

## Related

- [Command Templates](../../templates/command/)
- [Skill Templates](../../templates/skill/)
- [Skills Documentation](../../docs/skills/)
