---
name: code-review
description: Code review guidelines and checklist
---

# Code Review Skill

[日本語版 (Japanese)](./code-review.ja.md)

## Overview

Guidelines for conducting code reviews on Pull Requests and code changes with consistent standards. Ensures quality and maintainability based on SOLID principles and team conventions.

## Scope

- Pull Request reviews
- Self-review of code changes
- Refactoring proposals

## MCP Tools Used

| MCP | Tool | Purpose |
| --- | ---- | ------- |
| @eslint/mcp | lint | Static analysis and rule violation detection |
| @eslint/mcp | fix | Auto-fix correctable issues |

## Workflow

### 1. Run Static Analysis

```
Execute lint via MCP to identify mechanically detectable issues
```

### 2. Verify Design Principles

Review code from the following perspectives:

- **S**: Single Responsibility Principle - Each class/function has only one responsibility
- **O**: Open/Closed Principle - Open for extension, closed for modification
- **L**: Liskov Substitution Principle - Derived classes can substitute base classes
- **I**: Interface Segregation Principle - No forced dependencies on unused interfaces
- **D**: Dependency Inversion Principle - Depend on abstractions, not concretions

### 3. Create Review Comments

Summarize issues and improvement suggestions:

- Severity (Critical / Major / Minor / Suggestion)
- Affected location
- Suggested improvement

## Decision Criteria

| Condition | Action |
| --------- | ------ |
| ESLint errors present | Comment as mandatory fix |
| SOLID principle violation | Propose design improvement |
| Performance concerns | Flag with measurement methodology |
| Readability issues | Provide concrete improvement examples |

## Notes

- Frame feedback as improvement suggestions, not criticism
- Actively comment on positive aspects as well
- Delegate automatable tasks to MCP

## References

- [ESLint MCP](https://github.com/anthropics/claude-code/blob/main/examples/mcp/eslint/README.md)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
