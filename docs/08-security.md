# MCP開発時のセキュリティ考慮

> MCPサーバーの開発・運用におけるセキュリティリスクと対策を整理する。

## このドキュメントについて

MCPサーバーは外部APIやデータベースに接続するため、適切なセキュリティ対策なしには重大なリスクを招く可能性がある。LINEヤフーの調査によれば、多くのMCPが静的APIキーに依存しており、セキュリティ面では発展途上にある。

このドキュメントでは、MCPサーバーの開発・運用における主要なリスクカテゴリを整理し、それぞれの対策を具体的に示す。また、**OWASP MCP Top 10（2025）** を「ブレない参照先」として活用し、開発時に使えるチェックリストを提供する。

## 参照先：OWASP MCP Top 10

### 概要

MCPサーバー開発時のセキュリティガイドラインとして、**OWASP MCP Top 10 (2025)** を参照する。

| 項目           | 内容                                      |
| -------------- | ----------------------------------------- |
| **URL**        | https://owasp.org/www-project-mcp-top-10/ |
| **ステータス** | Phase 3 - Beta Release and Pilot Testing  |
| **ライセンス** | CC BY-NC-SA 4.0                           |
| **リーダー**   | Vandana Verma Sehgal, Liran Tal           |

> **注意**: これは従来の「OWASP Top 10（Webアプリケーション脆弱性）」とは別のプロジェクトであり、**MCPサーバー開発に特化したセキュリティガイドライン**である。

### OWASP Top 10 との違い

| 項目         | OWASP Top 10（従来） | OWASP MCP Top 10（2025）            |
| ------------ | -------------------- | ----------------------------------- |
| **対象**     | Webアプリケーション  | MCPサーバー開発                     |
| **脆弱性例** | SQLi, XSS, CSRF      | Token Mismanagement, Tool Poisoning |
| **用途**     | Webセキュリティ監査  | MCP開発時の設計指針                 |

### OWASP MCP Top 10 一覧

```mermaid
mindmap
  root((OWASP MCP<br/>Top 10))
    認証・認可
      MCP01: Token Mismanagement
      MCP02: Privilege Escalation
      MCP07: Insufficient Auth
    サプライチェーン
      MCP03: Tool Poisoning
      MCP04: Supply Chain Attacks
      MCP09: Shadow MCP Servers
    インジェクション
      MCP05: Command Injection
      MCP06: Prompt Injection
    データ・監視
      MCP08: Lack of Audit
      MCP10: Context Over-Sharing
```

| ID        | 名称                                        | 概要                                                                                          |
| --------- | ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **MCP01** | Token Mismanagement & Secret Exposure       | 認証情報のハードコード、長期間有効なトークン、ログへの漏洩                                    |
| **MCP02** | Privilege Escalation via Scope Creep        | 緩い権限定義による権限昇格、スコープの拡大                                                    |
| **MCP03** | Tool Poisoning                              | 悪意あるツール/プラグインによるコンテキスト注入（rug pull、schema poisoning、tool shadowing） |
| **MCP04** | Supply Chain Attacks & Dependency Tampering | 依存パッケージの改ざん、エージェント動作の変更                                                |
| **MCP05** | Command Injection & Execution               | 未検証の入力によるシステムコマンド実行                                                        |
| **MCP06** | Prompt Injection via Contextual Payloads    | テキストベースのインジェクション攻撃、モデルを標的とした攻撃                                  |
| **MCP07** | Insufficient Authentication & Authorization | マルチエージェント環境での弱いID検証                                                          |
| **MCP08** | Lack of Audit and Telemetry                 | ログ・監視の不足によるインシデント対応の困難                                                  |
| **MCP09** | Shadow MCP Servers                          | セキュリティガバナンス外の未承認MCPデプロイ（Shadow ITのMCP版）                               |
| **MCP10** | Context Injection & Over-Sharing            | 共有コンテキストウィンドウでの機密情報漏洩                                                    |

### 各脆弱性の詳細と対策

#### MCP01: Token Mismanagement & Secret Exposure

**リスク**: 認証情報がソースコード、ログ、モデルのメモリに残る

```typescript
// ❌ 悪い例：ハードコード
const API_KEY = 'sk-1234567890abcdef';

// ✅ 良い例：環境変数から取得
const API_KEY = process.env.DEEPL_API_KEY;
```

**対策**:

- 認証情報は環境変数またはシークレット管理サービスから取得
- ログに認証情報を出力しない
- 短命なトークン（Short-lived tokens）を使用
- トークンのローテーションを実装

#### MCP02: Privilege Escalation via Scope Creep

**リスク**: 最初は限定的だった権限が時間とともに拡大

**対策**:

- 最小権限の原則を厳守
- 権限の定期レビュー
- ツールごとに必要な権限を明示的に定義

#### MCP03: Tool Poisoning

**リスク**: 悪意あるMCPサーバーがコンテキストに有害な情報を注入

```
攻撃パターン:
├── Rug Pull: 信頼を得た後に悪意ある動作に変更
├── Schema Poisoning: スキーマ定義に悪意あるコードを埋め込み
└── Tool Shadowing: 正規ツールを偽装して置き換え
```

**対策**:

- 信頼できるソースからのみMCPを導入
- ソースコードレビューの実施
- 利用許可リストでの管理

#### MCP04: Supply Chain Attacks & Dependency Tampering

**リスク**: 依存パッケージが改ざんされ、エージェントの動作が変更される

**対策**:

```bash
# 定期的な脆弱性チェック
npm audit
pip-audit

# ロックファイルの使用
package-lock.json
poetry.lock
```

#### MCP05: Command Injection & Execution

**リスク**: 未検証の入力がシステムコマンドとして実行される

```typescript
// ❌ 悪い例：直接コマンド実行
exec(`ls ${userInput}`);

// ✅ 良い例：入力検証 + エスケープ
const sanitizedInput = sanitize(userInput);
execFile('ls', [sanitizedInput]);
```

**対策**:

- すべての入力を検証
- パラメータ化されたコマンド実行
- サンドボックス環境での実行

#### MCP06: Prompt Injection via Contextual Payloads

**リスク**: テキストに埋め込まれた悪意ある指示がモデルの動作を変更

**対策**:

- 入力のサニタイズ
- コンテキストの分離
- 出力の検証

#### MCP07: Insufficient Authentication & Authorization

**リスク**: マルチエージェント環境での弱いID検証

**対策**:

- 強力な認証メカニズム（OAuth 2.0推奨）
- エージェント間の相互認証
- 最小権限の原則

#### MCP08: Lack of Audit and Telemetry

**リスク**: ログ・監視の不足によりインシデント検知・対応が困難

**対策**:

- 構造化ログの実装
- 監視・アラートの設定
- 監査証跡の保持

#### MCP09: Shadow MCP Servers

**リスク**: 未承認のMCPサーバーがセキュリティガバナンス外で運用される

**対策**:

- MCPサーバー利用許可リストの運用
- 定期的な棚卸し
- セキュリティポリシーの周知

#### MCP10: Context Injection & Over-Sharing

**リスク**: 共有コンテキストウィンドウで機密情報が意図せず公開される

**対策**:

- コンテキストへの情報投入を最小限に
- 機密情報のマスキング
- コンテキスト分離の検討

---

## MCPセキュリティの現状

### LINEヤフーの調査結果

LINEヤフーがMCPエコシステムを調査した結果

| 項目                  | 割合     | リスク                         |
| --------------------- | -------- | ------------------------------ |
| 何らかの認証が必要    | **88%**  | 認証情報の管理が必要           |
| 静的APIキー/PATに依存 | **53%**  | 長期有効なトークンの漏洩リスク |
| OAuth等の安全な方式   | **8.5%** | ほとんどが旧来の方式           |

**結論**: MCPサーバーの認証は発展途上であり、慎重な管理が必要。

## リスクカテゴリ（従来の整理）

```mermaid
mindmap
  root((MCPセキュリティ<br/>リスク))
    認証・認可
      APIキー漏洩
      過剰な権限付与
      トークン管理
    データ
      機密情報の露出
      入力検証不足
      ログへの漏洩
    サプライチェーン
      悪意あるMCP
      依存パッケージ
      更新の信頼性
    運用
      設定ミス
      監視不足
      インシデント対応
```

## リスク1: 認証・認可

### 問題

- **静的APIキーの長期使用** - 漏洩時の影響が大きい
- **過剰な権限** - 必要以上のスコープを要求
- **認証情報のハードコード** - ソースコードに直接記載

### 対策

#### 1. 認証情報の安全な管理

```bash
# ❌ 悪い例：ハードコード
export API_KEY="sk-1234567890abcdef"

# ✅ 良い例：環境変数（.envファイルは.gitignoreに）
# .env
DEEPL_API_KEY=${DEEPL_API_KEY}

# さらに良い例：シークレット管理サービス
# AWS Secrets Manager, HashiCorp Vault等
```

#### 2. 最小権限の原則

```markdown
## MCPツール設計時の権限確認

- [ ] 本当にその権限が必要か？
- [ ] 読み取りのみで済む場合は書き込み権限を要求しない
- [ ] スコープを最小限に絞る
```

#### 3. トークンのローテーション

```mermaid
flowchart LR
    A[初期トークン発行] --> B[定期ローテーション]
    B --> C[旧トークン失効]
    C --> D[新トークン使用]
    D --> B
```

## リスク2: データセキュリティ

### 問題

- **機密情報のMCP経由送信** - 意図しないデータ露出
- **入力検証の不足** - インジェクション攻撃
- **ログへの機密情報漏洩** - デバッグログに認証情報

### 対策

#### 1. 入力検証

```typescript
// MCPツール実装時の入力検証例
export const getRfcRequirements = {
	name: 'get_requirements',
	description: 'RFC要件を取得',
	inputSchema: {
		type: 'object',
		properties: {
			rfc: {
				type: 'number',
				minimum: 1,
				maximum: 99999, // 妥当な範囲を設定
				description: 'RFC番号',
			},
			level: {
				type: 'string',
				enum: ['MUST', 'SHOULD', 'MAY'], // 許可値を限定
				description: '要件レベル',
			},
		},
		required: ['rfc'],
	},
};
```

#### 2. ログのサニタイズ

```typescript
// ❌ 悪い例
console.log(`API呼び出し: key=${apiKey}, query=${query}`);

// ✅ 良い例
console.log(`API呼び出し: key=*****, query=${query}`);
```

#### 3. 機密データの分類

```markdown
## データ分類

### 送信してはいけないデータ

- 認証情報（APIキー、パスワード）
- 個人情報（PII）
- 社内機密情報

### 送信可能なデータ

- 公開仕様書の参照
- 一般的な技術情報
- 匿名化されたデータ
```

## リスク3: サプライチェーン

### 問題

- **悪意あるMCPサーバー** - マルウェア混入
- **依存パッケージの脆弱性** - npm/pipの依存関係
- **更新の信頼性** - 乗っ取られたパッケージ

### 対策

#### 1. MCP利用許可リスト

LINEヤフーのアプローチを参考に

```markdown
## 承認済みMCPサーバー一覧

### 公式・信頼できるソース

- @modelcontextprotocol/\* （Anthropic公式）
- DeepL公式MCP

### 自作（内部監査済み）

- @shuji-bonji/rfcxml-mcp
- @shuji-bonji/xcomet-mcp-server

### 承認待ち

- （セキュリティレビュー中）

### 禁止

- 出所不明のMCP
- 認証情報を外部送信するMCP
```

#### 2. 依存関係の監査

```bash
# npm audit で脆弱性チェック
npm audit

# 定期的な更新
npm update

# 重大な脆弱性は即座に対応
npm audit fix
```

#### 3. ソースコードレビュー

```markdown
## MCPサーバー導入前チェックリスト

- [ ] ソースコードが公開されているか
- [ ] 認証情報の扱いは適切か
- [ ] 外部への不審な通信はないか
- [ ] 依存パッケージは信頼できるか
- [ ] メンテナンスは継続されているか
```

## リスク4: 運用セキュリティ

### 問題

- **設定ミス** - 本番環境での誤設定
- **監視不足** - 異常の検知遅れ
- **インシデント対応** - 対応手順の不備

### 対策

#### 1. 環境分離

```mermaid
graph LR
    subgraph 開発環境
        DEV_MCP[MCP Server<br/>テスト用API]
    end

    subgraph 本番環境
        PROD_MCP[MCP Server<br/>本番API]
    end

    DEV_MCP -.->|"設定を流用しない"| PROD_MCP
```

#### 2. ログ・監視

```markdown
## 監視すべき項目

- [ ] API呼び出し回数の異常増加
- [ ] エラー率の上昇
- [ ] 認証失敗の頻発
- [ ] 想定外のエンドポイントへのアクセス
```

#### 3. インシデント対応手順

```markdown
## MCPセキュリティインシデント対応

### 1. 検知

- 監視アラート
- ユーザー報告
- 外部通報

### 2. 初動対応

- 該当MCPの即時無効化
- APIキー/トークンの失効
- 影響範囲の特定

### 3. 調査

- ログ分析
- 侵入経路の特定
- 漏洩データの特定

### 4. 復旧

- 新しい認証情報の発行
- 設定の修正
- MCPの再有効化

### 5. 再発防止

- 原因分析
- 対策の実施
- 手順の更新
```

## MCP開発時のセキュリティチェックリスト

### 設計フェーズ

```markdown
- [ ] 最小権限の原則を適用しているか
- [ ] 認証方式は適切か（OAuth推奨）
- [ ] 機密データの扱いを定義しているか
- [ ] OWASP MCP Top 10を確認したか
```

### 実装フェーズ

```markdown
- [ ] 入力検証を実装しているか（MCP05対策）
- [ ] 認証情報をハードコードしていないか（MCP01対策）
- [ ] ログに機密情報を出力していないか（MCP01対策）
- [ ] エラーメッセージに内部情報を含めていないか
- [ ] 依存パッケージを監査したか（MCP04対策）
```

### テストフェーズ

```markdown
- [ ] セキュリティテストを実施したか
- [ ] 依存パッケージの脆弱性をチェックしたか
- [ ] 異常入力に対する動作を確認したか
- [ ] プロンプトインジェクションの耐性を確認したか（MCP06対策）
```

### 運用フェーズ

```markdown
- [ ] 認証情報のローテーション計画があるか
- [ ] 監視・アラートを設定しているか（MCP08対策）
- [ ] インシデント対応手順があるか
- [ ] 定期的なセキュリティレビューを行っているか
- [ ] MCPサーバー利用許可リストを管理しているか（MCP09対策）
```

## CLAUDE.md でのセキュリティポリシー記載例

```markdown
# セキュリティポリシー

## 参照先

- OWASP MCP Top 10: https://owasp.org/www-project-mcp-top-10/

## 使用禁止MCP

- 出所不明のMCPサーバー
- 認証情報を外部送信するMCP

## 認証情報の扱い

- APIキーは環境変数から取得
- ログに認証情報を出力しない
- コードに認証情報をハードコードしない

## データの扱い

- 個人情報をMCP経由で送信しない
- 社内機密情報は匿名化してから処理
```

## まとめ

### 重要な原則

1. **OWASP MCP Top 10を参照** - MCPサーバー開発の「ブレない参照先」
2. **信頼できるMCPのみ使用** - 利用許可リストで管理
3. **最小権限** - 必要な権限のみ付与
4. **認証情報の安全な管理** - ハードコード禁止、ローテーション
5. **入力検証** - すべての入力を検証
6. **監視とログ** - 異常検知、ただし機密情報は除外
7. **インシデント対応** - 手順を事前に準備

### MCPセキュリティの成熟度

```mermaid
graph LR
    L1[レベル1<br/>無管理] --> L2[レベル2<br/>リスト管理]
    L2 --> L3[レベル3<br/>監視・監査]
    L3 --> L4[レベル4<br/>自動化]
```

現在は**レベル2（リスト管理）** を目指すのが現実的。

## 参考リンク

- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/) - MCPサーバー開発セキュリティ
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Webアプリケーションセキュリティ（従来版）
- [LINEヤフーのMCP活用事例](https://techblog.lycorp.co.jp/) - エンタープライズでのMCP運用
