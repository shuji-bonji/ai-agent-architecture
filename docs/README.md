# Docs

[日本語版 (Japanese)](/ja/)

This directory contains systematized documentation for AI agent configuration.

## New Structure (v2 Restructuring)

With the expansion of the repository scope, the documentation structure has been reorganized as follows. Each directory systematizes knowledge from a different perspective.

```
docs/
├── concepts/          # Vision, Philosophy, Theory
│   ├── 01-vision.md
│   ├── 02-reference-sources.md
│   ├── 03-architecture.md
│   ├── 04-ai-design-patterns.md
│   └── 05-solving-ai-limitations.md
├── mcp/              # MCP (External Integration)
│   ├── catalog.md
│   ├── security.md
│   └── development.md (planned)
├── skills/           # Skills (Domain Knowledge)
│   ├── overview.md
│   ├── vs-mcp.md     # Selection Decision Guide
│   ├── anti-patterns.md
│   └── creating-skills.md (planned)
├── strategy/          # Construction Strategy
│   ├── mcp-roadmap.md          # MCP Construction Roadmap
│   ├── skill-roadmap.md        # Skill Construction Roadmap
│   └── composition-patterns.md # Composition Patterns
├── workflows/        # Workflows and Operations
│   ├── patterns.md
│   └── development-phases.md
├── roadmap.md
├── outputs.md
├── glossary.md
└── translation-quality-report.md
```

## About This Documentation

This documentation systematizes the **design philosophy, architecture, and practical know-how** of the MCP ecosystem that supports AI-driven development.

This is not merely a tool usage manual, but includes answers to fundamental questions such as "Why build MCPs?", "How should AI and humans collaborate?", and "What should be prioritized in development?".

Insights gained through dialogue with Claude are compiled in a reusable format.

## Document List

### Vision and Philosophy

| File                                                                   | Content                                        |
| ---------------------------------------------------------------------- | ---------------------------------------------- |
| [concepts/01-vision.md](./concepts/01-vision.md)                       | Vision and Core Philosophy of AI-Driven Development |
| [concepts/02-reference-sources.md](./concepts/02-reference-sources.md) | System of "Reliable Reference Sources"         |

### Architecture and Design

| File                                                         | Content                            |
| ------------------------------------------------------------ | ---------------------------------- |
| [concepts/03-architecture.md](./concepts/03-architecture.md) | MCP/Skills/Agent Configuration Theory |
| [concepts/04-ai-design-patterns.md](./concepts/04-ai-design-patterns.md) | AI Design Patterns and the Role of MCP |
| [concepts/05-solving-ai-limitations.md](./concepts/05-solving-ai-limitations.md) | Approaches to Solving AI Limitations |

### MCP (External Integration)

| File                                 | Content                                |
| ------------------------------------ | -------------------------------------- |
| [mcp/catalog.md](./mcp/catalog.md)   | Built MCP Catalog and Achievements     |
| [mcp/security.md](./mcp/security.md) | Security Considerations for MCP Development |

### Skills (Domain Knowledge)

| File                                               | Content                              |
| -------------------------------------------------- | ------------------------------------ |
| [skills/overview.md](./skills/overview.md)         | Vercel Skills and Agent Skills Spec  |
| [skills/vs-mcp.md](./skills/vs-mcp.md)             | MCP vs Skills Selection Decision Guide |
| [skills/anti-patterns.md](./skills/anti-patterns.md) | MCP/Skills Anti-patterns Collection  |

### Strategy (Construction Strategy)

| File                                                                   | Content                                |
| ---------------------------------------------------------------------- | -------------------------------------- |
| [strategy/mcp-roadmap.md](./strategy/mcp-roadmap.md)                   | MCP Construction Roadmap (Discussion #19) |
| [strategy/skill-roadmap.md](./strategy/skill-roadmap.md)               | Skill Construction Roadmap (Discussion #20) |
| [strategy/composition-patterns.md](./strategy/composition-patterns.md) | Composition Patterns (MCP × Skill × Agent) |

### Workflows (Workflow and Operations)

| File                                                                 | Content                              |
| -------------------------------------------------------------------- | ------------------------------------ |
| [workflows/patterns.md](./workflows/patterns.md)                     | Integration Patterns and Workflows   |
| [workflows/development-phases.md](./workflows/development-phases.md) | Development Phases and Corresponding Actions |

### Planning and Achievements

| File                           | Content                        |
| ------------------------------ | ------------------------------ |
| [roadmap.md](./roadmap.md)     | Priority and Roadmap           |
| [outputs.md](./outputs.md)     | Achievements and Output List   |

### Reference

| File                         | Content    |
| ---------------------------- | ---------- |
| [glossary.md](./glossary.md) | Glossary   |

## Reading Guide

### For First-Time Readers

1. **concepts/01-vision.md** - Understand the overall philosophy
2. **concepts/03-architecture.md** - Understand the components
3. **mcp/catalog.md** - Review specific MCPs

### For Practitioners

1. **skills/vs-mcp.md** - Decide what to use
2. **workflows/patterns.md** - Explore specific workflows
3. **mcp/catalog.md** - Review details of each MCP

### For Understanding Build Plans

1. **strategy/mcp-roadmap.md** - MCP build priorities and plans
2. **strategy/skill-roadmap.md** - Skill build priorities and dependencies
3. **strategy/composition-patterns.md** - MCP × Skill combination patterns

### For Contributors

1. **roadmap.md** - Understand priorities and plans
2. **mcp/security.md** - Review security considerations
3. **glossary.md** - Confirm terminology

## Related Directories

- `../references/` - Reference links and materials
- `../templates/` - Skill and Command templates

## Update History

| Date       | Content                          |
| ---------- | -------------------------------- |
| 2025-01-26 | Initial version (11 files)       |
| 2026-02-16 | Added strategy/ directory (mcp-roadmap, skill-roadmap, composition-patterns) |
