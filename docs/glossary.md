# 用語集

> MCP関連の用語と概念を定義する。

## このドキュメントについて

MCPエコシステムには多くの専門用語や略語が登場する。このドキュメントは、本ドキュメント群で使用される用語の定義を一箇所にまとめたリファレンスである。

初めてこのドキュメント群を読む人は、不明な用語があればここを参照することで理解を深められる。また、チーム内での共通言語として、用語の解釈を統一する役割も果たす。

## プロトコル・規格

### MCP（Model Context Protocol）

Anthropicが策定したAIモデルと外部ツール/リソースを接続するためのオープンプロトコル。

```
特徴:
- JSON-RPCベース
- ツール（Tool）、リソース（Resource）、プロンプト（Prompt）を提供
- 「AIのUSB」と例えられる
```

**関連**: MCPサーバー、MCPクライアント、MCPホスト

### A2A（Agent-to-Agent Protocol）

Googleが提唱し、Linux Foundationに寄贈されたエージェント間通信プロトコル。

```
特徴:
- エージェント同士の連携を標準化
- MCPと補完関係（MCP=ツール接続、A2A=エージェント間）
- 150社以上がサポート表明
```

**関連**: Agent Card、タスク管理

### RFC（Request for Comments）

IETFが発行するインターネット技術標準文書。

```
例:
- RFC 6455: WebSocketプロトコル
- RFC 3161: タイムスタンププロトコル
- RFC 9110: HTTP Semantics
```

**関連**: IETF、MUST/SHOULD/MAY

## MCPアーキテクチャ

### MCPホスト（Host）

MCPクライアントを内蔵し、ユーザーインターフェースを提供するアプリケーション。

```
例:
- Claude Code
- Claude.ai
- Cursor
- VS Code（拡張機能経由）
```

### MCPクライアント（Client）

MCPサーバーとの通信を処理するプロトコル層。

```
役割:
- サーバーの発見・起動
- 接続管理
- JSON-RPC通信
- エラーハンドリング

通常はHostに内蔵されており、開発者は意識しない。
```

### MCPサーバー（Server）

ツール、リソース、プロンプトを提供するサービス。

```
役割:
- ツールの定義と実行
- リソースへのアクセス提供
- プロンプトテンプレートの提供

例:
- rfcxml-mcp（RFC解析）
- deepl-mcp（翻訳）
- xcomet-mcp-server（品質評価）
```

### ツール（Tool）

MCPサーバーが提供する実行可能な機能。

```
例:
- get_rfc_structure（rfcxml-mcp）
- translate-text（deepl-mcp）
- xcomet_evaluate（xcomet-mcp-server）

構成:
- 名前（name）
- 説明（description）
- 入力スキーマ（inputSchema）
```

### リソース（Resource）

MCPサーバーが提供するデータ・ファイル。

```
例:
- ファイルシステム内のファイル
- データベースのレコード
- 外部APIのデータ

URI形式で識別される。
```

## Claude Code 固有

### カスタムサブエージェント（Custom Subagent）

Claude Code内で定義できる、特定タスクに特化したAIアシスタント。

```
定義場所:
- .claude/agents/xxx.md（プロジェクト）
- ~/.claude/agents/xxx.md（ユーザー）

特徴:
- 独立したコンテキスト
- ツール制限が可能
- 役割の明確化
```

**注意**: MCPクライアントの「代わり」ではなく「上位レイヤー」

### Skill（スキル）

Claude Codeで参照できる静的な知識・ガイドライン。

```
定義場所:
- .claude/skills/xxx/SKILL.md（プロジェクト）
- ~/.claude/skills/xxx/SKILL.md（ユーザー）

特徴:
- Markdown形式
- 実行機能なし（参照のみ）
- コンテキスト消費が低い
```

**用途**: ベストプラクティス、ワークフロー定義、コーディング規約

### CLAUDE.md

プロジェクトルートに配置する、Claudeへの指示ファイル。

```
内容:
- プロジェクト概要
- 使用MCP一覧
- コーディング規約
- ワークフロー指示
```

## 要件レベル

### MUST / MUST NOT

RFCにおける必須要件。遵守しないと仕様違反。

```
例: "A TCP implementation MUST support simultaneous open attempts"
```

### SHOULD / SHOULD NOT

RFCにおける推奨要件。正当な理由があれば違反可能。

```
例: "Implementations SHOULD use exponential backoff"
```

### MAY

RFCにおける任意要件。実装するかは自由。

```
例: "A client MAY provide additional metadata"
```

## 品質評価

### xCOMET

翻訳品質を評価するニューラルメトリクス。

```
特徴:
- 0-1のスコア（高いほど高品質）
- エラースパンの検出
- 参照訳なしでも評価可能
```

### エラー重大度（Severity）

xCOMETが検出するエラーの深刻度。

```
レベル:
- critical: 重大（意味の逆転、誤訳）
- major: 中程度（不自然な表現）
- minor: 軽微（スタイルの問題）
```

## その他

### ブレない参照先

AIの判断を一貫させるための権威ある情報源。

```
階層:
1. 国際標準・法規制（MUST遵守）
2. 業界標準・デファクト（SHOULD遵守）
3. 組織・プロジェクト規約（ローカル）
4. ベストプラクティス（推奨）
```

### 知識の民主化

専門知識へのアクセス障壁を下げること。

```
MCPの文脈では:
- 仕様書を読める人が限られている
  → AIがMCP経由で参照し、誰でも理解可能な形で提供
- 高額なコンサルや専門家に頼らなくても
  正確な情報に基づいた開発ができる
```

### AI駆動開発

AIをコード生成だけでなく、開発全工程で「知的アシスタント」として活用する開発手法。

```
≠ AIにコードを書かせること
= 全工程でAIを活用し、人間は判断・創造に集中
```

### Over-MCPization（過剰MCP化）

必要以上にMCPサーバーを追加し、コンテキストウィンドウを圧迫する状態。

```
症状:
- ツール定義が常駐してコンテキスト消費
- 起動オーバーヘッド増大
- 70k問題（ツール多すぎで性能劣化）

対策:
- Skillで代替できるものは移行
- プロジェクト毎にMCPを限定
```

### Agent Card

A2Aプロトコルにおける、エージェントの自己紹介情報。

```
配置: /.well-known/agent.json

内容:
- エージェント名
- エンドポイント
- 提供スキル
- 認証方式
```

## 略語一覧

| 略語     | 正式名称                                           | 説明                               |
| -------- | -------------------------------------------------- | ---------------------------------- |
| MCP      | Model Context Protocol                             | AIとツールの接続プロトコル         |
| A2A      | Agent-to-Agent Protocol                            | エージェント間通信プロトコル       |
| RFC      | Request for Comments                               | IETF技術標準文書                   |
| IETF     | Internet Engineering Task Force                    | インターネット技術標準化団体       |
| W3C      | World Wide Web Consortium                          | Web標準化団体                      |
| WHATWG   | Web Hypertext Application Technology Working Group | HTML等の標準化団体                 |
| API      | Application Programming Interface                  | アプリケーション間インターフェース |
| JSON-RPC | JSON Remote Procedure Call                         | JSONベースのRPCプロトコル          |
| ADR      | Architecture Decision Record                       | アーキテクチャ決定記録             |
| TLS      | Transport Layer Security                           | 通信暗号化プロトコル               |
| TSA      | Time Stamp Authority                               | タイムスタンプ局                   |
