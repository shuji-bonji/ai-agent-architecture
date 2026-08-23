---
title: IV.2 Limits
description: Limits connection can fill, and limits it cannot. What technology erases, and what remains.
---

# IV.2 Limits

> [!NOTE] Where this chapter sits
> Part I summarised the limits. This chapter looks at how far current means reach. It does not promise they vanish. Restatement of Part I is short. The difference in reach is the focus.

## 2.1 Reach differs across the four

Ask Claude about today's statute, and anything after the training cutoff is unknown unless you connect. Connect, and freshness can be filled quite far. Connecting still does not let the model claim an official reading. Responsibility remains further out.

| Limit | Reach today | Why |
| --- | --- | --- |
| **Freshness** | Can be filled quite far | You can connect to source text or search on the spot |
| **Accuracy** | Can be reduced. Does not vanish | Predicting the next word remains |
| **Authority** | Can be reduced. Does not become official | The output is one reading |
| **Accountability** | Technology is not enough | It sits on the side of law and ethics. Technology adds records and lines |

The knowledge side (freshness, accuracy) is easy to add from outside and to check by machine. The institutional side (authority, responsibility) leaves human judgment. That split is the starting point of design.

A design that erases accuracy completely is not written. Writing by probability never reaches zero. Ways to reduce it are connecting to source text, checking after generation, writing that you do not know, and having a human look.

## 2.2 Writing by probability, and checking by machine

The model writes plausible sentences. Checking, where possible, is done by machine. Mix the two, and both weaken.

In translation, the model writes the sentence, a tool takes the xCOMET score, and Doctrine's line sends it back under 0.85. Whether it is done **MUST NOT** (must not) be left to the model's "done". That is the same as Part I.

An audit record — which edition, which place — can be kept by technology. The record is not responsibility itself. Final judgment remains on the human side.

## 2.3 How the five layers receive them

| Limit | Main layer | Received, but not finished |
| --- | --- | --- |
| Freshness | MCP | If the endpoint is old, freshness returns |
| Accuracy | MCP + Skills + Agent's check | Guesswork remains |
| Authority | MCP (source text) + Doctrine (do not claim official) | The output is not an official view |
| Accountability | Doctrine + human review + records | The system does not take responsibility |

Earlier drafts wrote this table on three layers. This book uses five. The measure is Doctrine. Last time's continuation is Memory. Institutional design itself was left out in the preface. It is not entered here either.

## 2.4 What this chapter does not promise

| It does say | It does not say |
| --- | --- |
| Connection and checking can reduce chances to drift | Drift vanishes |
| Citations can be attached | Humans need not look |
| Records can be kept | The system holds legal responsibility |

How far to go autonomous is decided per job. Handing everything to an agent is not always good design.

## 2.5 Summary

Freshness can be filled quite far by connecting. Accuracy can be reduced but does not vanish. Authority can follow source text but does not become official. Responsibility remains outside technology. Separate writing by probability from checking by machine.

## Related pages

- [I.1 Constraint summary](../part-1/constraints)
- [III.3 Doctrine](../part-3/doctrine)
- [Deterministic verdicts](../strategy/deterministic-verdicts)
- [understanding-llm / Part 1](https://shuji-bonji.github.io/understanding-llm-through-claude-code/01-llm-structural-problems/)

---

> **Previous**: [IV.1 Patterns](./patterns)
>
> **Next**: [IV.3 Physical world](./physical)
