# Skills ドキュメント

Vercel Skills と Agent Skills Specification に基づくドメイン知識・実行パターンの標準化について。

## 📚 ドキュメント一覧

1. **[overview.md](./overview.md)** - Vercel Skills と Agent Skills Specification の概要
   - Vercel Skills の特徴
   - 27+ エージェント対応状況
   - Skillの構成要素

2. **[vs-mcp.md](./vs-mcp.md)** - MCP vs Skills：本質的な違いと選択判断
   - 概要比較表
   - 本質的な違い
   - **選択判断フロー** ← 迷ったらこれ
   - 組み合わせ活用パターン

3. **[anti-patterns.md](./anti-patterns.md)** - MCP/Skills アンチパターン集
   - over-MCPization（MCPの過剰使用）
   - over-Skillization（Skillsの過剰使用）
   - 曖昧なSkill定義
   - MCPツール依存の過度な結合

4. **[creating-skills.md](./creating-skills.md)** (計画中) - Skillsの作成ガイド
   - メタデータ設計
   - 実行可能ガイドラインの構造化
   - Vercel Skills との統合方法
   - チーム運用ノウハウ

## 🎯 Quick Start

### MCP vs Skills、どちらを使うべき？

👉 [vs-mcp.md#選択判断フロー](./vs-mcp.md#選択判断フロー) を参照

### Skillsについて学ぶ

1. [overview.md](./overview.md) で概要を把握
2. [vs-mcp.md](./vs-mcp.md) でMCPとの違いを理解
3. チーム内の実装例を参考にSkill作成に着手

## 📌 関連ドキュメント

- **MCP について:** [../mcp/catalog.md](../mcp/catalog.md)
- **選択判断の参考:** [../concepts/03-architecture.md](../concepts/03-architecture.md)
- **外部リンク集:** [../../references/skills/links.md](../../references/skills/links.md)

## 🔗 外部資料

- [Agent Skills Specification](https://agentskills.io)
- [Vercel Skills Changelog](https://vercel.com/changelog/skills-v1-1-1-interactive-discovery-open-source-release-and-agent-support)
