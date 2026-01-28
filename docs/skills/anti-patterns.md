# MCP/Skills Anti-Pattern Collection

[日本語版 (Japanese)](./anti-patterns.ja.md)

This document organizes common failure patterns in MCP and Skills design and operation, along with how to avoid them.

## 1. over-MCPization (Excessive Use of MCP)

### Symptoms

Implementing internal team knowledge and guidelines as MCP servers.

### Problematic Approach

```
❌ Building an MCP server to retrieve team coding standards
❌ Providing design principles as an API
❌ Converting internal workflows into MCP tools
```

### Why This Is a Problem

- MCP server responsibilities become bloated
- Increased server operation costs
- Difficult to customize on the agent side
- Authentication and deployment become complex

### Correct Approach

```
✅ Internal team knowledge → Define as a Skill
✅ Access to external APIs → Implement as MCP
```

**Decision Criteria**: "Is this an external service, or team knowledge?"

## 2. over-Skillization (Excessive Use of Skills)

### Symptoms

Attempting to explain external API calls and real-time data retrieval through Skills.

### Problematic Approach

```
❌ Skill: "How to translate using DeepL" (detailing API call procedures)
❌ Skill: "How to search RFCs" (explaining search API usage)
❌ Skill: "GitHub repository operation procedures"
```

### Why This Is a Problem

- Skills become bloated and complex
- Difficult to keep up with external system updates
- Authentication credential management becomes ambiguous
- Agent cannot execute (reference only)

### Correct Approach

```
✅ External API integration → Implement as MCP
✅ MCP usage and guidelines → Supplement with Skills
```

**Decision Criteria**: "Is dynamic execution required, or is this static knowledge?"

## 3. Ambiguous Skill Definitions

### Symptoms

Skill content is too abstract, preventing the agent from taking concrete actions.

### Problematic Approach

```markdown
❌ # Code Review Skill

Code review is important.
Write good code.
Check for bugs.
```

### Why This Is a Problem

- Agent cannot establish decision criteria
- Execution results vary each time
- Quality cannot be guaranteed

### Correct Approach

```markdown
✅ # Code Review Skill

## Checklist

1. Zero ESLint errors
2. No violations of SOLID principles
3. Test coverage at 80% or higher

## Decision Criteria

| Condition             | Action                     |
| --------------------- | -------------------------- |
| ESLint errors present | Correction required        |
| Coverage below 80%    | Request additional tests   |
```

**Countermeasure**: Define numerical standards, specific conditions, and clear actions

## 4. Excessive Coupling with MCP Tool Dependencies

### Symptoms

Skills are strongly dependent on specific MCP internal implementations.

### Problematic Approach

```markdown
❌ # Translation Skill

Use translate-text from deepl MCP version 1.2.3.
Specify "nonewlines" for the split_sentences parameter.
Cache takes effect internally, so the second call is faster.
```

### Why This Is a Problem

- Breaks when MCP version is upgraded
- Dependency on internal implementation is difficult to maintain
- Cannot be replaced with other MCPs

### Correct Approach

```markdown
✅ # Translation Skill

## MCP Usage

| MCP                                   | Purpose          |
| ------------------------------------- | ---------------- |
| deepl (or equivalent translation MCP) | Text translation |

## Workflow

1. Execute translation (formality: formal)
2. Check quality score
3. Re-translate if below threshold
```

**Countermeasure**: Describe at the MCP interface level, do not depend on implementation details

## 5. Violation of Single Responsibility Principle

### Symptoms

Packing multiple different responsibilities into a single Skill.

### Problematic Approach

```markdown
❌ # Development Skill

## Code Review

...

## Deployment Procedures

...

## Incident Response

...

## New Employee Onboarding

...
```

### Why This Is a Problem

- Large impact scope when updating
- Cannot reference only the needed parts
- Wasteful context consumption increases

### Correct Approach

```
✅ skills/
    ├── code-review/SKILL.md
    ├── deployment/SKILL.md
    ├── incident-response/SKILL.md
    └── onboarding/SKILL.md
```

**Countermeasure**: 1 Skill = 1 Responsibility

## 6. Unmaintained Skills

### Symptoms

Skills that are left unchanged after creation, diverging from actual operations.

### Problematic Approach

```
❌ Using a Skill created six months ago without changes
❌ Team standards have changed but Skill hasn't been updated
❌ Unknown who the owner is
```

### Why This Is a Problem

- Agent operates with outdated information
- Leads to incorrect decisions
- Decreased reliability

### Correct Approach

```markdown
✅ ---
name: code-review
description: Code review guidelines
owner: @frontend-team
last_reviewed: 2025-01-15
```

**Countermeasures**:

- Specify an owner
- Set up a regular review cycle
- Record the last review date

## Anti-Pattern Quick Reference

| Pattern                | Symptom                         | Countermeasure                        |
| ---------------------- | ------------------------------- | ------------------------------------- |
| over-MCPization        | Converting internal knowledge to MCP | Migrate to Skills              |
| over-Skillization      | Explaining external APIs in Skills | Migrate to MCP                   |
| Ambiguous Skills       | Too abstract                    | Clarify with numbers and conditions   |
| Excessive Coupling     | Dependency on MCP internals     | Describe at interface level           |
| Single Responsibility Violation | Multiple responsibilities in 1 Skill | Split Skills          |
| Unmaintained           | Divergence from operations      | Set owner and review cycle            |

## Related Documentation

- [MCP vs Skills](./vs-mcp.md) - Essential differences and selection criteria
- [Skills Overview](./overview.md) - Skills overview
- [Architecture](../concepts/03-architecture.md) - MCP/Skills/Agent architecture theory
