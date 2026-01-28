# Skill テンプレート

このディレクトリには、Skill作成のためのテンプレートとサンプルが含まれています。

## ファイル構成

```
templates/skill/
├── README.md                  # このファイル
├── SKILL.md.template          # Skillの基本テンプレート
└── examples/
    ├── code-review.md         # コードレビューSkillの例
    └── translation-workflow.md # 翻訳ワークフローSkillの例
```

## 使い方

### 1. テンプレートをコピー

```bash
cp templates/skill/SKILL.md.template .claude/skills/my-skill/SKILL.md
```

### 2. 必須項目を記入

- `name`: Skill名（kebab-case推奨）
- `description`: 目的と用途の説明
- `# 概要`: Skillが解決する課題

### 3. 詳細を追加

- 使用MCPツール（ある場合）
- 具体的なワークフロー
- 判断基準や閾値

## Skill配置場所

| 場所 | パス | 優先度 |
| ---- | ---- | ------ |
| プロジェクト | `.claude/skills/xxx/SKILL.md` | 高 |
| ユーザー | `~/.claude/skills/xxx/SKILL.md` | 低 |

## 関連

- [Command テンプレート](../command/README.ja.md) - Skill を使うコマンドの作成

## 参考

- [Skills 概要](../../docs/skills/overview.ja.md)
- [MCP vs Skills](../../docs/skills/vs-mcp.ja.md)
- [アンチパターン](../../docs/skills/anti-patterns.ja.md)
