# Skills の概要

## Vercel Skills とは

Vercel Skills は、AIエージェント向けの標準化されたドメイン知識表現フレームワークです。MCPと異なり、**特定のドメインやタスクに対する実行可能なノウハウ**をエージェントが習得・活用できるようにします。

### 特徴

- **ドメイン知識の体系化**: 特定分野の専門知識・ベストプラクティスを構造化
- **インタラクティブな発見**: エージェントが利用可能なSkillsを対話的に探索
- **標準仕様への準拠**: Agent Skills Specification に基づく相互運用性
- **オープンソース化**: [Vercel Skills v1.1.1](https://vercel.com/changelog/skills-v1-1-1-interactive-discovery-open-source-release-and-agent-support) がリリース

## Agent Skills Specification

[https://agentskills.io](https://agentskills.io) で標準化されている仕様。以下のエージェントに対応

- **Claude Code** (Anthropic)
- **Cursor** (Editor)
- **GitHub Copilot** (GitHub)
- その他 27 種類以上のエージェントプラットフォーム

## Skill の構成要素

### 1. メタデータ

```json
{
	"name": "frontend-design",
	"version": "1.0.0",
	"description": "React/Next.js フロントエンド設計のベストプラクティス",
	"author": "example-org",
	"tags": ["frontend", "react", "design"]
}
```

### 2. 実行可能なガイドライン

- ディレクトリ構成の推奨パターン
- コンポーネント設計の原則
- テストカバレッジ要件
- パフォーマンス最適化の指針

### 3. リアルタイムの学習

- エージェントが対話を通じてSkillを習得
- タスク実行中のコンテキスト内で実装

## MCPとSkillsの使い分け

| 側面             | MCP                   | Skills                           |
| ---------------- | --------------------- | -------------------------------- |
| **目的**         | 外部ツール・API連携   | ドメイン知識・実行ノウハウ       |
| **対象**         | 外部システム          | 実装パターン・ベストプラクティス |
| **ユースケース** | rfcxml-mcp, deepl-mcp | frontend-design, doc-coauthoring |
| **運用形態**     | サーバープロセス      | メモリ内（Skillモデル）          |

> 詳細は [vs-mcp.md](./vs-mcp.md) を参照。

## Skillsの作成・活用パターン

1. **既存ドキュメント化フェーズ**
   - チーム内のベストプラクティスをSkillsに変換
   - 例: Figma設計ガイド → `design-system-skill`

2. **エージェント習得フェーズ**
   - エージェントがSkillを通じてドメイン知識を習得
   - 対話的なクエリで理解度を深める

3. **運用・改善フェーズ**
   - エージェントの実行結果をフィードバック
   - Skillの内容を継続的に最適化

## 参考リンク

- [Agent Skills Specification](https://agentskills.io)
- [Vercel Skills 公式ドキュメント](https://vercel.com/changelog/skills-v1-1-1-interactive-discovery-open-source-release-and-agent-support)
- [関連リンク集](../../references/skills/links.md)
