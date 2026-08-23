# Docs

This directory contains systematized documentation for AI agent configuration.

## New Structure (v2 Restructuring)

With the expansion of the repository scope, the documentation structure has been reorganized as follows. Each directory systematizes knowledge from a different perspective.

```
docs/
├── preface.md         # Preface
├── part-1/            # Part I
│   └── constraints.md
├── part-2/            # Part II
│   ├── layers.md
│   └── placement.md
├── part-3/            # Part III Doctrine / Memory
│   ├── doctrine.md
│   └── memory.md
├── part-4/            # Part IV
│   ├── patterns.md
│   ├── limits.md
│   ├── physical.md
│   └── prompt-decomposition.md
├── concepts/          # Redirects from old URLs
├── mcp/              # MCP (External Integration)
│   ├── catalog.md
│   ├── security.md
│   └── development.md (planned)
├── skills/           # Skills (Domain Knowledge)
│   ├── what-is-skills.md  # What is Skills (intro)
│   ├── creating-skills.md # Skill Design Guide
│   ├── how-to-create-skills.md # Creation Tutorial
│   ├── how-to-use-skills.md    # Usage Guide
│   ├── skill-use-cases.md      # Use Case Patterns
│   ├── vs-mcp.md     # Selection Decision Guide
│   └── anti-patterns.md
├── strategy/          # Construction Strategy
│   └── composition-patterns.md # Composition Patterns
├── workflows/        # Workflows and Operations
│   ├── patterns.md
│   └── development-phases.md
├── outputs.md
├── glossary.md
└── translation-quality-report.md
```

## About This Documentation

This documentation systematizes the **design philosophy, architecture, and practical know-how** of the MCP ecosystem that supports AI-driven development.

This is not merely a tool usage manual, but includes answers to fundamental questions such as "Why build MCPs?", "How should AI and humans collaborate?", and "What should be prioritized in development?".

Insights gained through dialogue with Claude are compiled in a reusable format.

## Document List

### Spine

| File | Content |
| ---- | ------- |
| [Preface](./preface) | Questions and scope |
| [I.1 Constraint summary](./part-1/constraints) | Structural limits of the foundation model |
| [II.1 Five layers](./part-2/layers) | Doctrine / Agent / Skills / Memory / MCP |
| [II.2 Placement](./part-2/placement) | What belongs in which layer |
| [IV.1 Patterns](./part-4/patterns) | How to pick a type |
| [IV.2 Limits](./part-4/limits) | Lines that cannot be reached |

### MCP (External Integration)

| File                                 | Content                                |
| ------------------------------------ | -------------------------------------- |
| [mcp/catalog.md](./mcp/catalog.md)   | Built MCP Catalog and Achievements     |
| [mcp/security.md](./mcp/security.md) | Security Considerations for MCP Development |

### Skills (Domain Knowledge)

| File                                               | Content                              |
| -------------------------------------------------- | ------------------------------------ |
| [skills/what-is-skills.md](./skills/what-is-skills.md) | What is Skills — Introduction |
| [skills/creating-skills.md](./skills/creating-skills.md) | Skill Design Guide |
| [skills/how-to-create-skills.md](./skills/how-to-create-skills.md) | Step-by-step Creation Tutorial |
| [skills/how-to-use-skills.md](./skills/how-to-use-skills.md) | Project Integration Guide |
| [skills/skill-use-cases.md](./skills/skill-use-cases.md) | Use Case Patterns |
| [skills/vs-mcp.md](./skills/vs-mcp.md)             | MCP vs Skills Selection Decision Guide |
| [skills/anti-patterns.md](./skills/anti-patterns.md) | MCP/Skills Anti-patterns Collection  |

### Strategy (Construction Strategy)

| File                                                                   | Content                                |
| ---------------------------------------------------------------------- | -------------------------------------- |
| [strategy/composition-patterns.md](./strategy/composition-patterns.md) | Composition Patterns (MCP × Skill × Agent) |

### Workflows (Workflow and Operations)

| File                                                                 | Content                              |
| -------------------------------------------------------------------- | ------------------------------------ |
| [workflows/patterns.md](./workflows/patterns.md)                     | Integration Patterns and Workflows   |
| [workflows/development-phases.md](./workflows/development-phases.md) | Development Phases and Corresponding Actions |

### Planning and Achievements

| File                           | Content                        |
| ------------------------------ | ------------------------------ |
| [outputs.md](./outputs.md)     | Achievements and Output List   |

### Reference

| File                         | Content    |
| ---------------------------- | ---------- |
| [glossary.md](./glossary.md) | Glossary   |

## Reading Guide

### For First-Time Readers

1. **preface.md** - Questions and scope
2. **part-1/constraints.md** - Constraint summary
3. **part-2/layers.md** - Five layers
4. **mcp/catalog.md** - Review specific MCPs

### For Practitioners

1. **skills/vs-mcp.md** - Decide what to use
2. **workflows/patterns.md** - Explore specific workflows
3. **mcp/catalog.md** - Review details of each MCP

### For Understanding Build Plans

1. **strategy/composition-patterns.md** - MCP × Skill combination patterns

### For Contributors

1. **mcp/security.md** - Review security considerations
2. **glossary.md** - Confirm terminology

## Related Directories

- `../references/` - Reference links and materials
- `../templates/` - Skill and Command templates

## Update History

| Date       | Content                          |
| ---------- | -------------------------------- |
| 2025-01-26 | Initial version (11 files)       |
| 2026-02-16 | Added strategy/ directory (mcp-roadmap, skill-roadmap, composition-patterns) |
