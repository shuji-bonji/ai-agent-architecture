# 情報基盤 (Information) — 企業導入のための情報アーキテクチャ

> AI に何を読ませ、どの経路で取得させ、誰がその品質に責任を持つか。

## このセクションについて

本サイトは MCP と Skills から始まり、Agent・Strategy・Workflow へと拡張してきた。一方、企業システムへの LLM 導入の現場では、RAG・DB/API・Knowledge Graph・GraphRAG といったキーワードが MCP や Skills と**同じレベルで**扱われる。

このセクションは、それらを「実装メカニズム」ではなく**情報アーキテクチャ**の視点から扱う受け皿である。すなわち: どの情報を文書として扱い、どの情報を構造化データとして扱い、AI はどの経路で取得し、誰がその品質と鮮度に責任を持つか。

> **対象読者**: 企業システムへの AI 導入を設計する開発者・アーキテクト。Claude エコシステム固有の知識は前提としない。

> [!NOTE]
> 既存の [MCP](../mcp/what-is-mcp.md) / [Skills](../skills/what-is-skills.md) セクションが「実装メカニズムの棚」であるのに対し、本セクションは**ベンダー中立の設計判断の棚**である。両者は [全体地図](architecture-map.md) 上の持ち場として接続される。

> [!NOTE] 本サイトのスコープとの関係
> 本サイトが「AIエージェント」を LLM 駆動に絞る理由は [本サイトのスコープ (FAQ)](../faq/scope-of-ai-agent.md) を参照。本セクションは推論コアに接続される**情報側**を扱う。RAG・データ整備は Knowledge Boundary / Hallucination という LLM の構造的制約への**応答**であり、情報ガバナンス (オーナー・アクセス権・品質) はそれ以前に成立する**接続の前提条件**である。

## 構成

| ページ | 中心的な問い | 状態 |
| --- | --- | --- |
| [全体地図](architecture-map.md) | 各キーワードはアーキテクチャ全体のどこに位置するか | ✅ 公開 |
| RAG / GraphRAG | 文書知識をどう検索可能にするか、文書横断の質問にどう答えるか | 🚧 予定 |
| 情報ガバナンス | オーナー・形式・経路・権限・品質の 5 つの問いはどう依存し合うか | 🚧 予定 |
| 導入の異常系 | Evals・Prompt Injection・Human-in-the-Loop をどう前提条件に組み込むか | 🚧 予定 |

> [!TIP]
> まず [全体地図](architecture-map.md) を読むと、本サイトの全セクション (Concepts / MCP / Skills / Agents / Strategy / Workflows) と本セクションの関係が 1 枚で掴める。

## 関連ドキュメント

- [Concepts 08: 記憶と知識統合](../concepts/08-memory-and-knowledge.md) — Memory と Knowledge Graph の概念的基礎
- [MCP / Semantic Layer](../mcp/semantic-layer.md) — 構造化データアクセスの設計規律
- [MCP / セキュリティ](../mcp/security.md) — 接続経路のセキュリティ

---

> **次へ**: [全体地図](architecture-map.md)

**最終更新**: 2026年8月
