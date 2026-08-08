# Information — Information Architecture for Enterprise AI Adoption

> What should AI read, through which path should it retrieve it, and who is accountable for its quality?

## About This Section

This site started from MCP and Skills, then expanded into Agents, Strategy, and Workflows. Meanwhile, in real-world enterprise LLM adoption, keywords such as RAG, DB/API, Knowledge Graph, and GraphRAG are treated **at the same level** as MCP and Skills.

This section is the home for those topics — viewed not as implementation mechanisms but as **information architecture**: which information to keep as documents, which to keep as structured data, through which path AI should retrieve it, and who is accountable for its quality and freshness.

> **Audience**: Developers and architects designing AI adoption for enterprise systems. No Claude-ecosystem-specific knowledge is assumed.

> [!NOTE]
> While the existing [MCP](../mcp/what-is-mcp.md) / [Skills](../skills/what-is-skills.md) sections are shelves of "implementation mechanisms", this section is a shelf of **vendor-neutral design decisions**. The two are connected as posts on the [Architecture Map](architecture-map.md).

> [!NOTE] Relation to the scope of this site
> For why this site scopes "AI agents" to LLM-driven agents, see [The Scope of This Site (FAQ)](../faq/scope-of-ai-agent.md). This section covers the **information side** connected to the reasoning core: RAG and data curation are **responses** to the LLM's structural constraints (Knowledge Boundary / Hallucination), while information governance (ownership, access rights, quality) is a **precondition for the connection** that holds even before any LLM is involved.

## Structure

| Page | Central Question | Status |
| --- | --- | --- |
| [Architecture Map](architecture-map.md) | Where does each keyword sit in the overall architecture? | ✅ Published |
| RAG / GraphRAG | How to make document knowledge searchable, and how to answer cross-document questions? | 🚧 Planned |
| Information Governance | How do the five questions — owner, form, path, permission, quality — depend on each other? | 🚧 Planned |
| Adoption Failure Modes | How to make Evals, Prompt Injection defenses, and Human-in-the-Loop preconditions? | 🚧 Planned |

> [!TIP]
> Start with the [Architecture Map](architecture-map.md) — it shows in a single view how this section relates to every other section of the site (Concepts / MCP / Skills / Agents / Strategy / Workflows).

## Related Documents

- [Concepts 08: Memory & Knowledge](../concepts/08-memory-and-knowledge.md) — Conceptual foundation of Memory and Knowledge Graph
- [MCP / Semantic Layer](../mcp/semantic-layer.md) — Design discipline for structured data access
- [MCP / Security](../mcp/security.md) — Security of connection paths

---

> **Next**: [Architecture Map](architecture-map.md)

**Last updated**: August 2026
