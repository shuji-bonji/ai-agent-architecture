# MCP/A2A/Skill/Agent Architecture

[日本語版 (Japanese)](./03-architecture.ja.md)

> Understanding the components of AI-driven development infrastructure and organizing their roles and relationships.

## Layer Structure Overview

```
User Request
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│  Agent Layer                                             │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ • Task understanding                                │ │
│  │ • Orchestration decisions                           │ │
│  │ • Result synthesis                                  │ │
│  └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  Skills Layer                                            │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ • Domain knowledge                                  │ │
│  │ • Best practices & guidelines                       │ │
│  │ • Decision criteria                                 │ │
│  └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  MCP Layer                                               │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ • External API access                               │ │
│  │ • Tool execution                                    │ │
│  │ • Data retrieval                                    │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
     │
     ▼
External Services (DeepL, RFC Editor, GitHub, etc.)
```

### Layer Responsibilities

| Layer | Responsibility | Owns | Examples |
|-------|----------------|------|----------|
| **Agent** | Orchestration, decision-making | Task flow | Claude Code, Cursor |
| **Skills** | Domain knowledge, guidelines | Best practices | SOLID principles, translation guidelines |
| **MCP** | External connectivity | Tool definitions | deepl-mcp, rfcxml-mcp |

## About This Document

AI-driven development involves multiple components, and correctly understanding their roles and relationships is key to efficient development. This document organizes four main concepts: MCP (tool connectivity), A2A (agent-to-agent communication), Skill (static knowledge), and Custom Sub-agents (role specialization).

When you are unsure about "What should be implemented as MCP?", "When is a Skill sufficient?", or "When should I use a sub-agent?", refer to this document to make the appropriate choice.

## Overall Architecture

```mermaid
graph TB
    subgraph User Layer
        USER[User]
    end

    subgraph Host Application Layer
        HOST["Host<br/>(Claude Code / Claude.ai)"]
        SKILL["Skills<br/>(Static Knowledge)"]
    end

    subgraph Agent Layer
        MAIN["Main Agent"]
        SUB["Sub-agent"]
    end

    subgraph Protocol Layer
        MCP_CLIENT["MCP Client"]
        A2A_CLIENT["A2A Client"]
    end

    subgraph External Service Layer
        MCP_SERVER["MCP Servers"]
        A2A_AGENT["External A2A Agent"]
    end

    USER --> HOST
    HOST --> SKILL
    HOST --> MAIN
    MAIN --> SUB
    MAIN --> MCP_CLIENT
    MAIN --> A2A_CLIENT
    SUB --> MCP_CLIENT
    MCP_CLIENT --> MCP_SERVER
    A2A_CLIENT --> A2A_AGENT

    style SKILL fill:#90EE90
    style MCP_SERVER fill:#FFB6C1
    style A2A_AGENT fill:#87CEEB
```

## MCP Three-Layer Structure

### Host / Client / Server

```mermaid
graph TB
    subgraph Host["Host (Host Application)"]
        H_DESC["Provides User Interface<br/>Session Management"]
    end

    subgraph Client["Client (MCP Client)"]
        C_DESC["Server Discovery & Connection Management<br/>Protocol Processing"]
    end

    subgraph Server["Server (MCP Server)"]
        S_DESC["Provides Tools/Resources<br/>Actual Processing Execution"]
    end

    Host --> Client
    Client -->|JSON-RPC| Server
```

| Layer      | Role                                  | Example                      | Developer Involvement   |
| ---------- | ------------------------------------- | ---------------------------- | ----------------------- |
| **Host**   | UI, session management                | Claude Code, Cursor, VS Code | Consumer                |
| **Client** | Protocol processing, server management| Built into Host              | Usually not concerned   |
| **Server** | Tool/resource provision               | rfcxml-mcp, deepl-mcp        | **Provider**            |

### Why You Don't Need to Worry About the Client

```
Typical development flow:
1. Create an MCP Server (e.g., rfcxml)
2. Add it to Claude Code configuration
3. Claude Code operates as a built-in Client
4. Tools become available

→ The Client is embedded in the Host and
   functions as a black box
```

## MCP and A2A: Separation of Concerns

### Protocol Differences

```mermaid
graph TB
    subgraph MCP["MCP (Model Context Protocol)"]
        MCP_DESC["Agent ↔ Tool"]
        MCP_EXAMPLE["Example: Claude → rfcxml-mcp"]
    end

    subgraph A2A["A2A (Agent-to-Agent Protocol)"]
        A2A_DESC["Agent ↔ Agent"]
        A2A_EXAMPLE["Example: Internal Agent → Salesforce Agent"]
    end

    MCP -->|Complementary| A2A
```

| Item           | MCP                        | A2A                              |
| -------------- | -------------------------- | -------------------------------- |
| **Led by**     | Anthropic                  | Google → Linux Foundation        |
| **Purpose**    | Tool connectivity          | Agent-to-agent communication     |
| **Connects to**| MCP Server (tools)         | Other agents (including third-party) |
| **Context**    | Can share with parent agent| Completely isolated              |
| **Owner**      | Self                       | Self or **others**               |

### Official Recommendation

> Build with ADK, equip with **MCP** (tools), communicate with **A2A** (agents)

```
MCP = Using hands (tools)
A2A = Collaborating with others (agents)
```

## Custom Sub-agents

### What is a Sub-agent?

An **AI assistant specialized for specific tasks** that can be defined within Claude Code.

```
Location:
├── Project: .claude/agents/xxx.md (Priority: High)
└── User:    ~/.claude/agents/xxx.md (Priority: Low)
```

### Definition Format

```markdown
name: rfc-specialist
description: Expert in RFC specification verification and validation
tools: rfcxml:get_rfc_structure, rfcxml:get_requirements
model: sonnet

You are an expert in RFC specifications.
Use only the rfcxml tools.
```

### Sub-agent Positioning

```mermaid
graph TB
    subgraph Claude_Code["Inside Claude Code"]
        USER[User]
        MAIN["Main Claude<br/>(Orchestrator)"]
        SUBAGENT["Custom Sub-agent<br/>(.claude/agents/)"]
        MCP_CLIENT["MCP Client<br/>(Built into Claude Code)"]
    end

    subgraph External["External"]
        MCP_SERVERS["MCP Servers<br/>rfcxml, deepl, etc."]
    end

    USER --> MAIN
    MAIN -->|"Delegate"| SUBAGENT
    SUBAGENT -->|"Use"| MCP_CLIENT
    MAIN -->|"Use directly"| MCP_CLIENT
    MCP_CLIENT -->|"JSON-RPC"| MCP_SERVERS

    style MCP_CLIENT fill:#FFB6C1
    style SUBAGENT fill:#90EE90
```

**Important**: Sub-agents are not a "replacement" for the MCP Client, but rather a "higher layer"

- **Sub-agent** = Defines "what to do" (role, procedures)
- **MCP Client** = Implements "how to connect" (protocol processing)

## Skill

### What is a Skill?

**Static knowledge and guidelines** that can be referenced in Claude Code.

```
Location:
├── Project: .claude/skills/xxx/SKILL.md
└── User:    ~/.claude/skills/xxx/SKILL.md
```

### Skill Characteristics

| Item                   | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| **Format**             | Markdown file                                            |
| **Content**            | Best practices, workflow definitions, guidelines         |
| **Execution**          | None (reference only)                                    |
| **Context consumption**| Low (only when referenced)                               |

## MCP vs Skill vs Sub-agent

### Decision Flow

```mermaid
graph TB
    Q1{External API/dynamic<br/>processing needed?}
    Q1 -->|Yes| MCP[Use MCP]
    Q1 -->|No| Q2{Complex processing<br/>logic needed?}
    Q2 -->|Yes| MCP
    Q2 -->|No| Q3{Role/expertise<br/>separation needed?}
    Q3 -->|Yes| AGENT[Use Sub-agent]
    Q3 -->|No| SKILL[Use Skill]

    style MCP fill:#FFB6C1
    style SKILL fill:#90EE90
    style AGENT fill:#87CEEB
```

### Comparison Table

| Aspect                 | Skill              | MCP              | Sub-agent         |
| ---------------------- | ------------------ | ---------------- | ----------------- |
| **Context consumption**| Low                | High             | Medium            |
| **Dynamic processing** | Not possible       | Possible         | Possible          |
| **External API**       | Not possible       | Possible         | Via MCP           |
| **Maintenance**        | Markdown editing   | npm publish, etc.| Markdown editing  |
| **Reusability**        | Within project     | Global           | Within project    |
| **Use case**           | Knowledge/guidelines| Tool/API integration | Role/expertise separation |

### Principles for Choosing

```
Skill = "Knowledge", "Guidelines", "Workflow definitions"
MCP   = "Tools", "API integration", "Dynamic processing"
Sub-agent = "Roles", "Expertise", "Task delegation"

Use Skills to define "what should be done"
Use MCP to provide "how to execute it"
Use Sub-agents to separate "who does it"
```

## A2A vs Sub-agent

### Fundamental Differences

| Aspect             | Custom Sub-agent         | A2A Agent                 |
| ------------------ | ------------------------ | ------------------------- |
| **Location**       | Within same process      | Over the network          |
| **Owner**          | Self                     | Self or **others**        |
| **Trust**          | Full trust               | Authentication/authorization required |
| **Context**        | Partially shared with parent | Completely isolated    |
| **Lifecycle**      | Session-limited          | Persistent service        |
| **Internal implementation** | Visible (Markdown) | Not visible (API contract only) |

### Analogy

```
Custom Sub-agent = "Internal specialized department"
A2A Agent        = "Outsourcing partner / Partner company"

Even with internal specialized departments, outsourcing partners are needed
Even with outsourcing partners, internal specialized departments are needed

→ Both are necessary; they are not substitutes for each other
```

### When to Use Which

| Scenario                                | What to Use     |
| --------------------------------------- | --------------- |
| Want to use your own MCP expertly       | Sub-agent       |
| Want to reuse the same processing repeatedly | Sub-agent  |
| Want to define a workflow               | Sub-agent       |
| Integrate with third-party agents       | A2A             |
| Expose your agent externally            | A2A             |
| Agent collaboration across multiple organizations | A2A    |

## Combination Patterns

### The Most Powerful Combination

```mermaid
graph LR
    SKILL[Skill<br/>Workflow Definition] -->|"Reference"| AGENT[Sub-agent]
    AGENT -->|"Execute"| MCP[MCP<br/>Tools]

    style SKILL fill:#90EE90
    style MCP fill:#FFB6C1
    style AGENT fill:#87CEEB
```

### Concrete Example: Translation Workflow

```markdown
<!-- skills/translation-workflow/SKILL.md -->

# Technical Document Translation Workflow

## MCP Tools Used

- `deepl` - Translation execution
- `xcomet` - Quality evaluation

## Workflow

1. Translate with deepl:translate-text (formality: "more")
2. Evaluate with xcomet:xcomet_evaluate
   - Score 0.85 or higher: OK
   - Score below 0.85: Re-translate or manual correction
3. Detect errors with xcomet:xcomet_detect_errors
```

```markdown
<!-- agents/translation-specialist.md -->

name: translation-specialist
description: Specialized agent for technical document translation and quality evaluation
tools: deepl:translate-text, xcomet:xcomet_evaluate, xcomet:xcomet_detect_errors
model: sonnet

You are an expert in technical translation.
Please refer to the translation-workflow skill.
```

## Sequence Diagrams: Visualizing Execution Flow

### Code Review Task

```mermaid
sequenceDiagram
    participant U as User
    participant M as Main Agent
    participant S as Skill<br/>(Code Review)
    participant MCP as MCP Server<br/>(ESLint)

    U->>M: "Review this PR"
    M->>S: Reference guidelines
    S-->>M: Review perspectives & checklist
    M->>MCP: Run lint
    MCP-->>M: Violation list
    M->>U: Review result report
```

### Translation Workflow

```mermaid
sequenceDiagram
    participant U as User
    participant M as Main Agent
    participant S as Skill<br/>(Translation Guidelines)
    participant D as MCP Server<br/>(DeepL)
    participant X as MCP Server<br/>(xCOMET)

    U->>M: "Translate this document"
    M->>S: Reference translation rules
    S-->>M: Tone & terminology rules
    M->>D: translate-text
    D-->>M: Translation result
    M->>X: xcomet_evaluate
    X-->>M: Quality score
    alt Score < 0.85
        M->>D: Re-translate (adjust parameters)
        D-->>M: Improved translation
    end
    M->>U: Final translation result
```

## Layer Structure Summary

```
┌─────────────────────────────────────────────────────────┐
│  User                                                    │
├─────────────────────────────────────────────────────────┤
│  Host (Claude Code / Claude.ai)                          │
├─────────────────────────────────────────────────────────┤
│  Skills (Static Knowledge & Guidelines)                  │
├─────────────────────────────────────────────────────────┤
│  Main Agent                                              │  ← Orchestration
├─────────────────────────────────────────────────────────┤
│  Custom Sub-agents                                       │  ← Role & Expertise Definition
├─────────────────────────────────────────────────────────┤
│  MCP Client / A2A Client                                 │  ← Protocol Processing
├─────────────────────────────────────────────────────────┤
│  MCP Servers / External A2A Agents                       │  ← Tools & External Services
└─────────────────────────────────────────────────────────┘
```
