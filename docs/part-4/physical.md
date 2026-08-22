---
title: IV.3 Physical world
description: On robots and sensors the five layers own the same things. What changes is the implementation.
---

# IV.3 Physical world

> [!NOTE] Where this chapter sits
> The question is whether the same split works not only behind a screen but where wheels and arms move. How to write a sensor driver is out. Quantisation such as BitNet is an example of inferring at the edge. It is not written as a cure-all.

## 3.1 Does the same split suffice?

A robot sees, judges, and moves. It is easy to see as another world from an AI that writes sentences. Cut by ownership, the row is the same.

| Layer | On the cloud side | On the machine in the field |
| --- | --- | --- |
| **Doctrine** | Purpose and prohibitions | Lines kept even when you cannot ask — stop on collision, people first |
| **Agent** | Claude and the like | A smaller model that runs beside the machine |
| **Skills** | Rules in Markdown | Safety bounds, range of motion, physical rules of thumb |
| **Memory** | Last time's case | The path just taken, fault history |
| **MCP** | Web APIs and databases | Sensor input, actuator output |

Judge, hold knowledge, connect outside, hold a measure, keep relations. Whether the endpoint is an API or a sensor, this split does not change. What changes is the implementation.

Scholarship often says Embodied AI: having a body and learning while dealing with an environment. This book calls it the physical world, as the five layers stretched onto machines in the field.

## 3.2 The measure when you cannot ask

When the cloud can be reached, a thick model may be asked. When radio drops, a decision must be made on the spot. Failure is not a wrong sentence.

That is when Doctrine works. "If they move apart when they cannot ask, the design has failed," from Part III, here has a body. Put collision avoidance first. Stop at an unknown obstacle. Those are not a list of steps. They are a shared line.

Skills hold knowledge of motion — gravity, friction, and the like. It is sometimes called a world model. This book treats it as one kind of knowledge in Skills. Control theory in detail is out of scope. The preface cut it.

## 3.3 Inferring beside the machine

Machines in the field often run on batteries. A large model need not always be asked in the cloud. Weights can be made small and run beside a CPU. Quantisation such as BitNet is an example. Training aside, the point is to make inference practical in hand.

For nuance in text, a thick model still often fits better. For a bounded choice — how many degrees right, normal or not — a small model can suffice. Whatever the engine, the five-layer split does not change.

When cloud and field are combined, thick judgment may sit far away and fast judgment beside the machine. A digital twin can be an MCP counterpart for field state. When several machines combine, the same question as A2A in Part III appears: who acts, and on whose behalf.

## 3.4 For people who write software

This is not a new layer. It is the present five layers with sensors as endpoints. Safety lines are written first in Doctrine and Skills. The line that must not be crossed **SHOULD** (should) be decided before the code that moves.

## 3.5 Summary

On machines in the field the five layers own the same things. What changes is the implementation. The less you can ask, the more Doctrine is needed. Quantisation is an example of a means. It is not a substitute for a layer.

## Related pages

- [II.1 Five layers](../part-2/layers)
- [III.3 Doctrine](../part-3/doctrine)
- [III.5 Agent](../agents/)
- [Mapping onto a local LLM workspace](../strategy/local-llm-workspace-mapping)

---

> **Previous**: [IV.2 Limits](./limits)
>
> **Next**: [IV.4 Prompt decomposition](./prompt-decomposition)
