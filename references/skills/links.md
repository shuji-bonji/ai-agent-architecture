# Skills 関連リンク集

## 公式仕様・ドキュメント

### Agent Skills Specification

- **主官:** https://agentskills.io
- **GitHub:** https://github.com/agentskills (推定)
- **標準仕様:** Skills の相互運用性を定義

### Vercel Skills

- **リリース情報:** [Vercel Skills v1.1.1](https://vercel.com/changelog/skills-v1-1-1-interactive-discovery-open-source-release-and-agent-support)
- **公式ドキュメント:** https://vercel.com/docs/skills
- **GitHub:** https://github.com/vercel/skills (推定)

## エージェント実装例

### Claude Code (Anthropic)

- **概要:** Claude の code-execution インターフェース
- **Skills対応:** Agent Skills Specification に準拠
- **参考:** Claude 公式ドキュメント

### Cursor

- **概要:** AI-first コードエディタ
- **Skills対応:** v1.x 以降で統合開始
- **参考:** https://www.cursor.com

### GitHub Copilot

- **概要:** GitHub 統合 AI アシスタント
- **Skills対応:** Copilot Extensions で拡張
- **参考:** https://docs.github.com/en/copilot

## 関連エージェントプラットフォーム

Agent Skills Specification に対応する、その他のプラットフォーム（27 種類以上）

- JetBrains AI Assistant
- Visual Studio IntelliCode
- AWS CodeWhisperer
- その他…

> 詳細は [Agent Skills Specification](https://agentskills.io) を参照

## 実装リファレンス

### チュートリアル・ガイド

- Vercel Skills 作成ガイド（本リポジトリ予定）
- Agent Skills Specification コンプライアンスチェックリスト
- サンプル実装リポジトリ

### テンプレート・スターター

- `vercel/skills-template` (推定)
- `agent-skills/starter-kit` (推定)
- OpenSource 実装例

## ベストプラクティス・事例

### ドメイン別の Skill 設計

- **UI/UX デザイン:** Figma ガイドライン × Skill
- **バックエンド開発:** API 設計パターン × Skill
- **ドキュメント作成:** 文体ガイド × Skill
- **テスト戦略:** Coverage 要件 × Skill

### チーム運用パターン

- 複数 Skill の管理・バージョニング
- エージェント習得フェーズの設計
- フィードバックループの構築

## 関連ドキュメント（本リポジトリ）

- [docs/skills/overview.md](../../docs/skills/overview.md) - Skills 概要
- [docs/skills/vs-mcp.md](../../docs/skills/vs-mcp.md) - MCP vs Skills 比較
- [docs/skills/creating-skills.md](../../docs/skills/creating-skills.md) (計画中)

## RFCs・標準化動向

- [Agent Skills Specification (draft/proposed)](https://agentskills.io)
- Anthropic AI SDK における Skills サポート
- OpenAI Plugin システムとの比較検討

---

**更新日:** 2026年1月28日  
**注:** リンク集は継続的に更新予定。変更・追加があれば Issue/PR で報告ください。
