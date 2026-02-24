# MCP/Skills Anti-Pattern Collection

This document organizes common failure patterns in MCP and Skills design and operation, along with how to avoid them.

## 1. over-MCPization (Excessive Use of MCP)

### Symptoms

Implementing internal team knowledge and guidelines as MCP servers.

### Problematic Approach

This anti-pattern manifests in several common ways:

```
❌ Building an MCP server to retrieve team coding standards
❌ Providing design principles as an API
❌ Converting internal workflows into MCP tools
```

### Why This Is a Problem

Over-MCPization creates several operational and maintenance issues:

- MCP server responsibilities become bloated
- Increased server operation costs
- Difficult to customize on the agent side
- Authentication and deployment become complex

### Correct Approach

The proper solution separates team knowledge from external integration:

```
✅ Internal team knowledge → Define as a Skill
✅ Access to external APIs → Implement as MCP
```

**Decision Criteria**: "Is this an external service, or team knowledge?"

## 2. over-Skillization (Excessive Use of Skills)

### Symptoms

Attempting to explain external API calls and real-time data retrieval through Skills.

### Problematic Approach

This anti-pattern appears when external services are documented as Skills:

```
❌ Skill: "How to translate using DeepL" (detailing API call procedures)
❌ Skill: "How to search RFCs" (explaining search API usage)
❌ Skill: "GitHub repository operation procedures"
```

### Why This Is a Problem

Over-Skillization creates several practical challenges:

- Skills become bloated and complex
- Difficult to keep up with external system updates
- Authentication credential management becomes ambiguous
- Agent cannot execute (reference only)

### Correct Approach

Separate external APIs from usage guidelines:

```
✅ External API integration → Implement as MCP
✅ MCP usage and guidelines → Supplement with Skills
```

**Decision Criteria**: "Is dynamic execution required, or is this static knowledge?"

## 3. Ambiguous Skill Definitions

### Symptoms

Skill content is too abstract, preventing the agent from taking concrete actions.

### Problematic Approach

Vague Skills lack the specificity needed for reliable execution:

```markdown
❌ # Code Review Skill

Code review is important.
Write good code.
Check for bugs.
```

### Why This Is a Problem

Ambiguous Skills lead to inconsistent and unreliable execution:

- Agent cannot establish decision criteria
- Execution results vary each time
- Quality cannot be guaranteed

### Correct Approach

Define clear, measurable criteria that guide consistent execution:

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

Coupling Skills to internal MCP details creates fragility:

```markdown
❌ # Translation Skill

Use translate-text from deepl MCP version 1.2.3.
Specify "nonewlines" for the split_sentences parameter.
Cache takes effect internally, so the second call is faster.
```

### Why This Is a Problem

Over-specifying MCP details reduces flexibility and portability:

- Breaks when MCP version is upgraded
- Dependency on internal implementation is difficult to maintain
- Cannot be replaced with other MCPs

### Correct Approach

Define Skills at the interface level, abstracting away implementation details:

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

Monolithic Skills combine unrelated tasks:

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

Monolithic Skills create multiple maintenance and usage challenges:

- Large impact scope when updating
- Cannot reference only the needed parts
- Wasteful context consumption increases

### Correct Approach

Organize Skills by responsibility, keeping each one focused:

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

Neglected Skills drift away from operational reality:

```
❌ Using a Skill created six months ago without changes
❌ Team standards have changed but Skill hasn't been updated
❌ Unknown who the owner is
```

### Why This Is a Problem

Unmaintained Skills undermine agent reliability and decision quality:

- Agent operates with outdated information
- Leads to incorrect decisions
- Decreased reliability

### Correct Approach

Establish clear ownership and regular review cycles:

```markdown
✅ ---
name: code-review
description: Code review guidelines
owner: @frontend-team
last_reviewed: 2025-01-15
```

**Countermeasures**:

Implement these practices to keep Skills current and reliable:

- Specify an owner
- Set up a regular review cycle
- Record the last review date

## Anti-Pattern Quick Reference

The following table provides a quick lookup for identifying and addressing each anti-pattern:

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
- [What is Skills](./what-is-skills) - Skills overview
- [Architecture](../concepts/03-architecture.md) - MCP/Skills/Agent architecture theory
