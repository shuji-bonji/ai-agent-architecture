# Glossary

> Definitions of MCP/Agent-related terms, and pointers to the LLM fundamentals they assume.

## About This Document

The MCP ecosystem involves many specialized terms and abbreviations. This document serves as a centralized reference for the definitions of terms used throughout this documentation set.

If you are new to this documentation, you can deepen your understanding by referring here when encountering unfamiliar terms. It also serves to unify terminology interpretation as a common language within teams.

## LLM Fundamentals (Defined in the Sister Site)

The terms in this section are defined in the sister site [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/). This section holds only the minimum definition needed to read this site; the mechanism and the evidence are left to the linked source. The first occurrence of each term on every page of this site links to the corresponding entry here.

### Token {#token}

The smallest unit an LLM processes. It is neither a character nor a word, but a fragment produced by the tokenizer. Japanese text costs 1–3 tokens per character, so the same content consumes more tokens than English.

**Defined in**: [Token, Context, Context Window — Three Fundamental Concepts](https://shuji-bonji.github.io/understanding-llm-through-claude-code/02-context-window/token-context-basics)

### Context {#context}

Everything passed to the LLM in a single inference: the system prompt, CLAUDE.md, conversation history, tool definitions, and tool results. The LLM generates output based only on what is in the context.

**Defined in**: [Token, Context, Context Window — Three Fundamental Concepts](https://shuji-bonji.github.io/understanding-llm-through-claude-code/02-context-window/token-context-basics)

**Related**: [What the LLM Sees](https://shuji-bonji.github.io/understanding-llm-through-claude-code/02-context-window/what-llm-sees) (what goes into the context and what stays outside it)

### Context Window {#context-window}

The upper limit, in tokens, of context an LLM can process at once. When the limit is reached, older information no longer fits. Even below the limit, output quality declines as input grows (→ Context Rot). On this site, "context pressure" and "context consumption" refer to how much of this limit is used.

**Defined in**: [Token, Context, Context Window — Three Fundamental Concepts](https://shuji-bonji.github.io/understanding-llm-through-claude-code/02-context-window/token-context-basics)

**Related**: [Context Budget](https://shuji-bonji.github.io/understanding-llm-through-claude-code/02-context-window/context-budget) (how much of the limit MCP tool definitions occupy)

### Stateless {#stateless}

An LLM retains nothing from the previous inference. A conversation appears continuous only because the application re-inserts the conversation history into the context on every turn. To "remember" across sessions, information must be written to a location outside the context, such as a file.

**Defined in**: [Token, Context, Context Window — "Stateless"](https://shuji-bonji.github.io/understanding-llm-through-claude-code/02-context-window/token-context-basics)

**Related**: [Why Memory Is a Problem](https://shuji-bonji.github.io/understanding-llm-through-claude-code/08-session-management/memory-problem)

### System Prompt {#system-prompt}

Instructions placed permanently at the head of the context that define the LLM's role, constraints, and behavior. In Claude Code, CLAUDE.md is injected into this position in addition to the internal system prompt. The body of a subagent definition file becomes the system prompt dedicated to that subagent.

**Defined in**: [What the LLM Sees](https://shuji-bonji.github.io/understanding-llm-through-claude-code/02-context-window/what-llm-sees)

### Session {#session}

A single conversation unit in which context accumulates. Context grows with every turn and never shrinks on its own. In Claude Code, `/compact` summarizes and compresses the history, and `/clear` starts a new session.

**Defined in**: [Chat / Session — The Container in Which Context Accumulates](https://shuji-bonji.github.io/understanding-llm-through-claude-code/02-context-window/chat-session)

**Related**: [/compact vs /clear](https://shuji-bonji.github.io/understanding-llm-through-claude-code/08-session-management/compact-and-clear)

### Structural Problems of LLMs (8 Items) {#structural-problems}

Problems that originate in how LLMs work and that prompt wording alone does not resolve. Every design decision on this site (subagent isolation, on-demand Skills, deferred loading of MCP tool definitions, and so on) is a response to one of these eight.

| Term | Minimum definition | Defined in |
| --- | --- | --- |
| **Context Rot** | Output quality declines as input token count grows | [context-rot](https://shuji-bonji.github.io/understanding-llm-through-claude-code/01-llm-structural-problems/context-rot) |
| **Lost in the Middle** | Information in the middle of the context is referenced less | [lost-in-the-middle](https://shuji-bonji.github.io/understanding-llm-through-claude-code/01-llm-structural-problems/lost-in-the-middle) |
| **Priority Saturation** | The more instructions given at once, the lower the compliance with each | [priority-saturation](https://shuji-bonji.github.io/understanding-llm-through-claude-code/01-llm-structural-problems/priority-saturation) |
| **Instruction Decay** | Compliance with initial instructions declines as the conversation grows | [instruction-decay](https://shuji-bonji.github.io/understanding-llm-through-claude-code/01-llm-structural-problems/instruction-decay) |
| **Hallucination** | Generates content that contradicts facts as if it were grounded | [hallucination](https://shuji-bonji.github.io/understanding-llm-through-claude-code/01-llm-structural-problems/hallucination) |
| **Sycophancy** | Prioritizes agreeing with the user over accuracy | [sycophancy](https://shuji-bonji.github.io/understanding-llm-through-claude-code/01-llm-structural-problems/sycophancy) |
| **Knowledge Boundary** | Knowledge is frozen at the training-data cutoff, and the model cannot say "I don't know" | [knowledge-boundary](https://shuji-bonji.github.io/understanding-llm-through-claude-code/01-llm-structural-problems/knowledge-boundary) |
| **Prompt Sensitivity** | Semantically identical prompts produce different outputs depending on wording | [prompt-sensitivity](https://shuji-bonji.github.io/understanding-llm-through-claude-code/01-llm-structural-problems/prompt-sensitivity) |

**Overview and relationships**: [Part 1: Structural Problems of LLMs](https://shuji-bonji.github.io/understanding-llm-through-claude-code/01-llm-structural-problems/)

> On this site, "frozen at the training-data cutoff" and "the recency constraint" refer to Knowledge Boundary. Of the four constraints in [01-vision](./concepts/01-vision) (accuracy, recency, authority, accountability), accuracy corresponds to Hallucination and recency to Knowledge Boundary. Authority and accountability are institutional rather than structural and are outside the sister site's scope.

### Tool Search / Deferred Loading {#tool-search}

A mechanism that loads MCP tool definitions when they are needed instead of placing all of them in the context at startup. Tool definitions are a fixed cost against the context window, so the more MCP servers are added, the more the presence or absence of this mechanism matters (→ Over-MCPization).

**Defined in**: [Tool Search / Deferred Loading](https://shuji-bonji.github.io/understanding-llm-through-claude-code/06-tool-context/tool-search)

**Related**: [MCP Context Cost](https://shuji-bonji.github.io/understanding-llm-through-claude-code/06-tool-context/mcp-context-cost)

### Harness {#harness}

The collective name for the four elements placed around an LLM: tool integration, memory, guardrails, and loop control. It limits the impact of structural problems from the outside without changing the LLM itself. See [harness-engineering-mapping](./strategy/harness-engineering-mapping) for how it maps to this site's five-layer model.

**Defined in**: [Harness and the Structural Constraints of LLMs](https://shuji-bonji.github.io/understanding-llm-through-claude-code/appendix/harness-and-llm-constraints)

### Weights {#weights}

The internal parameters of an LLM, fixed by training and unchanged at inference time. There are two ways to give a model specialization: change the weights (Fine-tuning) or put the knowledge into the context (Skills / MCP / RAG).

**Defined in**: this site, [specialization-weights-vs-context](./strategy/specialization-weights-vs-context) (the sister site has no dedicated page, so this site is the source)

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

**Defined in (sister site)**: [Part 5: Agents](https://shuji-bonji.github.io/understanding-llm-through-claude-code/05-on-demand-context/agents)

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

**Defined in (sister site)**: [Part 5: Skills](https://shuji-bonji.github.io/understanding-llm-through-claude-code/05-on-demand-context/skills)

### CLAUDE.md

An instruction file for Claude placed at the project root.

```
Contents:
- Project overview
- List of MCPs in use
- Coding conventions
- Workflow instructions
```

**Defined in (sister site)**: [Part 3: Always-Loaded Context — CLAUDE.md](https://shuji-bonji.github.io/understanding-llm-through-claude-code/03-always-loaded-context/claude-md)

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

### World Model

An agent's internal representation of environmental structure and physical laws. The foundational concept that enables agents to predict "what will happen next" and simulate the consequences of their actions.

```
Contexts:
- Robotics / autonomous driving: Internal models of physics (gravity, inertia, collision)
- LLMs: Implicit understanding of causal relationships and commonsense world behavior
- Reinforcement learning: Environment dynamics models (model-based RL)
```

In this site, World Models are primarily discussed in the context of [Physical AI](./concepts/06-physical-ai#the-importance-of-world-models). While implicitly present in information-space agents, they are an essential element for agents that operate in the physical world.

**Reference**: [Yann LeCun — A Path Towards Autonomous Machine Intelligence (2022)](https://openreview.net/pdf?id=BZ5a1r-kVsf)

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

**Related (sister site)**: [MCP Context Cost](https://shuji-bonji.github.io/understanding-llm-through-claude-code/06-tool-context/mcp-context-cost), [Tool Search / Deferred Loading](#tool-search)

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
