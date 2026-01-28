# Skill Template

[日本語版 (Japanese)](./README.ja.md)

This directory contains templates and examples for creating Skills.

## File Structure

```
templates/skill/
├── README.md                  # This file
├── SKILL.md.template          # Basic Skill template
└── examples/
    ├── code-review.md         # Code review Skill example
    └── translation-workflow.md # Translation workflow Skill example
```

## Usage

### 1. Copy the Template

```bash
cp templates/skill/SKILL.md.template .claude/skills/my-skill/SKILL.md
```

### 2. Fill in Required Fields

- `name`: Skill name (kebab-case recommended)
- `description`: Description of purpose and use cases
- `# Overview`: The problem this Skill solves

### 3. Add Details

- MCP tools used (if any)
- Specific workflow
- Decision criteria and thresholds

## Skill Placement

| Location | Path | Priority |
| -------- | ---- | -------- |
| Project | `.claude/skills/xxx/SKILL.md` | High |
| User | `~/.claude/skills/xxx/SKILL.md` | Low |

## References

- [Skills Overview](../../docs/skills/overview.md)
- [MCP vs Skills](../../docs/skills/vs-mcp.md)
- [Anti-Patterns](../../docs/skills/anti-patterns.md)
