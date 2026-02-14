# Glossary

[日本語版 (Japanese)](./glossary.ja.md)

> Definitions of MCP-related terms and concepts.

## About This Document

The MCP ecosystem involves many specialized terms and abbreviations. This document serves as a centralized reference for the definitions of terms used throughout this documentation set.

If you are new to this documentation, you can deepen your understanding by referring here when encountering unfamiliar terms. It also serves to unify terminology interpretation as a common language within teams.

## Protocols and Standards

### MCP (Model Context Protocol)

An open protocol developed by Anthropic for connecting AI models with external tools and resources.

```
Features:
- JSON-RPC based
- Provides Tools, Resources, and Prompts
- Often described as "USB for AI"
```

**Related**: MCP Server, MCP Client, MCP Host

### A2A (Agent-to-Agent Protocol)

An inter-agent communication protocol proposed by Google and donated to the Linux Foundation.

```
Features:
- Standardizes collaboration between agents
- Complementary relationship with MCP (MCP=tool connection, A2A=inter-agent)
- Over 150 companies have announced support
```

**Related**: Agent Card, Task Management

### RFC (Request for Comments)

Technical standard documents published by IETF for internet technologies.

```
Examples:
- RFC 6455: WebSocket Protocol
- RFC 3161: Timestamp Protocol
- RFC 9110: HTTP Semantics
```

**Related**: IETF, MUST/SHOULD/MAY

## MCP Architecture

### MCP Host

An application that embeds an MCP Client and provides the user interface.

```
Examples:
- Claude Code
- Claude.ai
- Cursor
- VS Code (via extensions)
```

### MCP Client

The protocol layer that handles communication with MCP Servers.

```
Responsibilities:
- Server discovery and startup
- Connection management
- JSON-RPC communication
- Error handling

Typically embedded in the Host; developers rarely interact with it directly.
```

### MCP Server

A service that provides Tools, Resources, and Prompts.

```
Responsibilities:
- Tool definition and execution
- Providing access to Resources
- Providing Prompt templates

Examples:
- rfcxml-mcp (RFC parsing)
- deepl-mcp (translation)
- xcomet-mcp-server (quality evaluation)
```

### Tool

An executable function provided by an MCP Server.

```
Examples:
- get_rfc_structure (rfcxml-mcp)
- translate-text (deepl-mcp)
- xcomet_evaluate (xcomet-mcp-server)

Components:
- name
- description
- inputSchema
```

### Resource

Data or files provided by an MCP Server.

```
Examples:
- Files in the filesystem
- Database records
- External API data

Identified using URI format.
```

## Claude Code Specific

### Custom Subagent

An AI assistant specialized for specific tasks that can be defined within Claude Code.

```
Definition locations:
- .claude/agents/xxx.md (project)
- ~/.claude/agents/xxx.md (user)

Features:
- Independent context
- Tool restrictions possible
- Clear role definition
```

**Note**: Not a "replacement" for MCP Client, but rather a "higher layer"

### Skill

Static knowledge and guidelines that can be referenced in Claude Code.

```
Definition locations:
- .claude/skills/xxx/SKILL.md (project)
- ~/.claude/skills/xxx/SKILL.md (user)

Features:
- Markdown format
- No execution capability (reference only)
- Low context consumption
```

**Use cases**: Best practices, workflow definitions, coding conventions

### CLAUDE.md

An instruction file for Claude placed at the project root.

```
Contents:
- Project overview
- List of MCPs in use
- Coding conventions
- Workflow instructions
```

## Requirement Levels

### MUST / MUST NOT

Mandatory requirements in RFCs. Non-compliance constitutes a specification violation.

```
Example: "A TCP implementation MUST support simultaneous open attempts"
```

### SHOULD / SHOULD NOT

Recommended requirements in RFCs. May be violated with valid justification.

```
Example: "Implementations SHOULD use exponential backoff"
```

### MAY

Optional requirements in RFCs. Implementation is at the discretion of the developer.

```
Example: "A client MAY provide additional metadata"
```

## Quality Evaluation

### xCOMET

A neural metric for evaluating translation quality.

```
Features:
- Score from 0-1 (higher is better quality)
- Error span detection
- Can evaluate without reference translations
```

### Error Severity

The severity level of errors detected by xCOMET.

```
Levels:
- critical: Severe (meaning reversal, mistranslation)
- major: Moderate (unnatural expressions)
- minor: Minor (style issues)
```

## AI Design Patterns

### RAG (Retrieval-Augmented Generation)

A technique that retrieves external documents via vector search and injects relevant information into the LLM's prompt.

```
How it works:
1. Split documents into chunks → Vectorize → Store in DB
2. Vectorize the user's question
3. Retrieve related chunks via similarity search
4. Inject chunks into prompt for LLM to generate answer

Strengths: Can find relevant information from large volumes of unstructured text
Weaknesses: Context lost through chunking, doesn't understand structure
```

**Related**: Embedding, Vector DB, Chunk

> **Difference from MCP**: See [concepts/04-ai-design-patterns.md](./concepts/04-ai-design-patterns.md)

### Embedding

Converting text into numerical vectors (arrays of hundreds to thousands of dimensions). Semantically similar texts are placed close together in vector space. The foundational technology behind RAG's vector search.

### Vector Database

A specialized database for storing and searching embedded vector data. Provides fast similarity search using cosine similarity and other metrics.

```
Examples: Pinecone, Weaviate, Chroma, pgvector
```

### Chunk

A small fragment created by splitting a document. In RAG, documents are split into chunks before vectorization. The chunk size and splitting method affect search accuracy.

### Prompt Engineering

A technique for controlling output quality solely through input prompt design, without changing model parameters. Includes techniques such as Zero-shot, Few-shot, and Chain-of-Thought.

### GraphRAG

A technique that combines standard RAG with knowledge graphs, leveraging entity relationships for search and generation. Particularly effective for relational questions like "How is A related to B?"

### Fine-tuning

A technique that further trains an LLM's parameters on domain-specific data. If RAG is "external memory," Fine-tuning is closer to "rewriting internal knowledge."

### Agentic AI

A pattern where an LLM autonomously plans, invokes tools, and solves problems through multiple steps. MCP is one of the foundational technologies that enables this pattern.

**Related**: MCP, Subagent, A2A

## Other Terms

### Authoritative Reference Sources

Authoritative information sources for maintaining consistency in AI decisions.

```
Hierarchy:
1. International standards and regulations (MUST comply)
2. Industry standards and de facto standards (SHOULD comply)
3. Organization/project conventions (local)
4. Best practices (recommended)
```

### Democratization of Knowledge

Lowering barriers to accessing specialized knowledge.

```
In the MCP context:
- Limited number of people can read specifications
  → AI references them via MCP and provides in an understandable format for anyone
- Accurate information-based development becomes possible
  without relying on expensive consultants or specialists
```

### AI-Driven Development

A development methodology that utilizes AI as an "intelligent assistant" throughout the entire development process, not just for code generation.

```
≠ Having AI write code
= Utilizing AI throughout all processes while humans focus on judgment and creativity
```

### Over-MCPization

A state where too many MCP servers are added unnecessarily, overwhelming the context window.

```
Symptoms:
- Tool definitions constantly consume context
- Increased startup overhead
- 70k problem (performance degradation from too many tools)

Countermeasures:
- Migrate to Skills where possible
- Limit MCPs per project
```

### Agent Card

Self-introduction information for agents in the A2A protocol.

```
Location: /.well-known/agent.json

Contents:
- Agent name
- Endpoint
- Provided skills
- Authentication method
```

## Abbreviation List

| Abbreviation | Full Name                                          | Description                              |
| ------------ | -------------------------------------------------- | ---------------------------------------- |
| RAG          | Retrieval-Augmented Generation                     | Search-augmented generation technique    |
| MCP          | Model Context Protocol                             | Protocol for connecting AI and tools     |
| A2A          | Agent-to-Agent Protocol                            | Inter-agent communication protocol       |
| RFC          | Request for Comments                               | IETF technical standard documents        |
| IETF         | Internet Engineering Task Force                    | Internet technology standardization body |
| W3C          | World Wide Web Consortium                          | Web standardization body                 |
| WHATWG       | Web Hypertext Application Technology Working Group | Standardization body for HTML, etc.      |
| API          | Application Programming Interface                  | Interface between applications           |
| JSON-RPC     | JSON Remote Procedure Call                         | JSON-based RPC protocol                  |
| ADR          | Architecture Decision Record                       | Architecture decision documentation      |
| TLS          | Transport Layer Security                           | Communication encryption protocol        |
| TSA          | Time Stamp Authority                               | Timestamp authority                      |
