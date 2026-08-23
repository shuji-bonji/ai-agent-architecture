---
title: III.2 MCP
description: The layer that connects to outside tools and data. It separates guesswork from source text.
---

# III.2 MCP

> [!NOTE] Where this chapter sits
> Skills are read only. Today's statute, today's translation, today's score are taken from outside. MCP is the layer that owns that connection. How to build servers and the catalogue remain in the pages below.

## 2.1 What it connects

Ask Claude what a given section of RFC 6455 is, and it may answer from training memory. Section numbers may drift. Connect to the source text, and the answer can carry a citation.

MCP stands for Model Context Protocol. It is a shared rule for connecting a model to outside tools and data. Anthropic published it. It is sometimes likened to USB. This book looks at ownership more than the simile. It is the layer that takes outside facts and actions.

It mainly offers three things.

| Offer | Meaning | Example |
| --- | --- | --- |
| **Tool** | An operation that can run | Fetch RFC structure, translate text, score quality |
| **Resource** | Data that can be read | A file, a record, a section of a spec |
| **Prompt** | A shape for how to ask | A fixed template for asking |

## 2.2 Why standardise the connection

It used to take a join for every model times every tool. MCP moves that product toward a sum. The model side is a client. The tool side is a server.

Inside, three roles run. They are not the five layers. They are inside the MCP protocol.

| Role | Owns | Does a developer touch it? |
| --- | --- | --- |
| **Host** | Screen and session. Claude Code and the like | The user side |
| **Client** | Finding servers and talking to them | Usually built into the host |
| **Server** | Offering tools and data | The builder side |

What a developer writes is, in most cases, the server. The client often need not be implemented by hand.

Agents talking to agents is A2A's job. MCP's endpoints are tools and data. Hand versus other party is a useful split. Both are sometimes needed.

## 2.3 Place among the five layers

Accuracy, freshness, and following source text are filled by connecting. Statutes, RFCs, and W3C specifications are examples. Servers built in this repository often sit in domains that have source text — RFC, W3C, translation quality, statute. See the [catalogue](./catalog).

Connecting does not guarantee that the answer is always correct, that the model may give an official reading, or that the system bears legal responsibility. Part I fixed that.

Not everything **MUST NOT** (must not) become MCP. Work that needs no judgment may be an ordinary program. Operations a human looks at may stay on the official CLI. Written rules are Skills.

Tool descriptions **SHOULD** not all be loaded at start. Descriptions are a fixed cost on context. Read them when needed. The mechanism is in the sister site [Part 6: Tool context](https://shuji-bonji.github.io/understanding-llm-through-claude-code/06-tool-context/).

## 2.4 Pages that follow

| Wanted | Page |
| --- | --- |
| What has been built | [Catalogue](./catalog) |
| How to build a server | [Development](./development) |
| Safety of the connection | [Security](./security) |
| A layer of meaning | [Semantic Layer](./semantic-layer) |
| Split from Skills | [MCP vs Skills](../skills/vs-mcp) |

## 2.5 Summary

MCP connects to outside tools and data. It is placed to separate guesswork from source text. Host / Client / Server in the protocol are not another name for the five layers. Source text is MCP, rules are Skills, the measure is Doctrine.

For which resource to read or write, see resource × access on the [Architecture Map](../information/architecture-map).

## Related pages

This chapter defines the layer and its boundary. Catalogue, security, and development follow.

- [Catalogue](./catalog)
- [Security](./security)
- [Semantic Layer](./semantic-layer)
- [Development](./development)
- [Architecture Map](../information/architecture-map) — resource types and the read / write split

---

> **Previous**: [Skills](../skills/what-is-skills)
>
> **Next**: [III.3 Doctrine](../part-3/doctrine)
