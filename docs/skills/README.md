# Skills Documentation

[日本語版 (Japanese)](./README.ja.md)

Standardization of domain knowledge and execution patterns based on Vercel Skills and Agent Skills Specification.

## 📚 Document List

1. **[overview.md](./overview.md)** - Overview of Vercel Skills and Agent Skills Specification
   - Features of Vercel Skills
   - 27+ Agent Compatibility Status
   - Skill Components

2. **[vs-mcp.md](./vs-mcp.md)** - MCP vs Skills: Essential Differences and Selection Criteria
   - Summary Comparison Table
   - Essential Differences
   - **Selection Decision Flow** ← Start here if unsure
   - Combined Usage Patterns

3. **[anti-patterns.md](./anti-patterns.md)** - MCP/Skills Anti-patterns Collection
   - Over-MCPization (Excessive use of MCP)
   - Over-Skillization (Excessive use of Skills)
   - Ambiguous Skill Definitions
   - Excessive Coupling with MCP Tool Dependencies

4. **[creating-skills.md](./creating-skills.md)** (Planned) - Skills Creation Guide
   - Metadata Design
   - Structuring Executable Guidelines
   - Integration Methods with Vercel Skills
   - Team Operation Best Practices

## 🎯 Quick Start

### MCP vs Skills: Which should you use?

👉 See [vs-mcp.md#selection-decision-flow](./vs-mcp.md#選択判断フロー)

### Learning about Skills

1. Understand the overview in [overview.md](./overview.md)
2. Learn the differences from MCP in [vs-mcp.md](./vs-mcp.md)
3. Start creating Skills using templates in [templates/skill/](../../templates/skill/)

## 📌 Related Documentation

- **About MCP:** [../mcp/catalog.md](../mcp/catalog.md)
- **Selection Criteria Reference:** [../concepts/03-architecture.md](../concepts/03-architecture.md)
- **Skill Templates:** [../../templates/skill/](../../templates/skill/)
- **External Links Collection:** [../../references/skills/links.md](../../references/skills/links.md)

## 🔗 External Resources

- [Agent Skills Specification](https://agentskills.io)
- [Vercel Skills Changelog](https://vercel.com/changelog/skills-v1-1-1-interactive-discovery-open-source-release-and-agent-support)
