# Glossary

> Definitions of MCP/Agent-related terms, and pointers to the LLM fundamentals they assume.

## About This Document

The MCP ecosystem involves many specialized terms and abbreviations. This document serves as a centralized reference for the definitions of terms used throughout this documentation set.

If you are new to this documentation, you can deepen your understanding by referring here when encountering unfamiliar terms. It also serves to unify terminology interpretation as a common language within teams.

## LLM Fundamentals (Defined in the Sister Site)

The terms in this section are defined in the sister site [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/). This section holds only the minimum definition needed to read this site; the mechanism and the evidence are left to the linked source. The first occurrence of each term on every page of this site links to the corresponding entry here.

### LLM (Large Language Model) {#llm}

A model trained on large amounts of text to predict the next token and generate prose. The core of systems such as Claude and ChatGPT. This is the AI this book primarily treats.

**Defined in**: The Japanese [Preface](/ja/preface). Mechanisms belong to the sister site [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/).

### Foundation Model {#foundation-model}

A model trained on large data and adaptable to many downstream tasks. An LLM is the central example. Adjacent models such as Vision-Language-Action (VLA) are included.

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

PLACEHOLDER_REST_OF_FILE
