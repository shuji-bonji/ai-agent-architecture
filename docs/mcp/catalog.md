# 構築済みMCPカタログ

> 構築・利用しているMCPサーバーの一覧と、それぞれの機能・用途・成果を整理する。

## このドキュメントについて

このドキュメントは、現在構築済み・利用中のMCPサーバーを一覧化したカタログである。各MCPの機能、提供ツール、実際の活用事例を記載している。

新しいMCPの開発を検討する際の参考として、また既存MCPの活用方法を確認する際のリファレンスとして使用する。MCPは単独でも価値があるが、複数を組み合わせることでより強力なワークフローが実現できる。そのヒントもここから得られる。

## 全体マップ

```mermaid
mindmap
  root((MCP<br/>エコシステム))
    自作MCP
      rfcxml-mcp
      w3c-mcp
      xcomet-mcp-server
      rxjs-mcp-server
      epsg-mcp
      pwa-mcp
    連携MCP
      deepl-mcp
      hourei-mcp-server
      mermaid-mcp
      svelte-mcp
      shadcn-svelte-mcp
    構想中
      OpenAPI MCP
      OWASP MCP
      Angular MCP
```

## 自作MCPサーバー

### rfcxml-mcp

IETF RFCドキュメントの構造化参照を提供。

| 項目           | 内容                                                                |
| -------------- | ------------------------------------------------------------------- |
| **リポジトリ** | [shuji-bonji/rfcxml-mcp](https://github.com/shuji-bonji/rfcxml-mcp) |
| **npm**        | `@shuji-bonji/rfcxml-mcp`                                           |
| **目的**       | RFC仕様の検索・解析・要件抽出                                       |
| **状態**       | ✅ 公開済み                                                         |

#### 主要ツール

| ツール                 | 機能                                  |
| ---------------------- | ------------------------------------- |
| `get_rfc_structure`    | RFCのセクション階層・メタデータ取得   |
| `get_requirements`     | MUST/SHOULD/MAY要件の構造化抽出       |
| `get_definitions`      | 用語定義の取得                        |
| `get_rfc_dependencies` | 参照関係（normative/informative）取得 |
| `get_related_sections` | 関連セクションの取得                  |
| `generate_checklist`   | 実装チェックリストのMarkdown生成      |
| `validate_statement`   | 実装が仕様に準拠しているか検証        |

#### 成果

- RFC 6455（WebSocket）の日本語翻訳に活用
- 電子署名法 × RFC 3161 のマッピングに活用
- 75個のMUST要件、23個のSHOULD要件を自動抽出

### w3c-mcp

W3C/WHATWG/IETF Web標準仕様へのアクセスを提供。

| 項目           | 内容                                                          |
| -------------- | ------------------------------------------------------------- |
| **リポジトリ** | [shuji-bonji/w3c-mcp](https://github.com/shuji-bonji/w3c-mcp) |
| **目的**       | Web標準仕様の検索・WebIDL・CSS・HTML要素                      |
| **状態**       | ✅ 公開済み                                                   |

#### 主要ツール

| ツール                  | 機能                                           |
| ----------------------- | ---------------------------------------------- |
| `list_w3c_specs`        | 仕様一覧（組織・カテゴリ・キーワードフィルタ） |
| `get_w3c_spec`          | 仕様の詳細情報                                 |
| `search_w3c_specs`      | 仕様の検索                                     |
| `get_webidl`            | WebIDLインターフェース定義                     |
| `get_css_properties`    | CSSプロパティ定義                              |
| `get_html_elements`     | HTML要素定義                                   |
| `get_pwa_specs`         | PWA関連仕様一覧                                |
| `get_spec_dependencies` | 仕様の依存関係                                 |

### xcomet-mcp-server

xCOMETモデルによる翻訳品質評価を提供。

| 項目           | 内容                                                                              |
| -------------- | --------------------------------------------------------------------------------- |
| **リポジトリ** | [shuji-bonji/xcomet-mcp-server](https://github.com/shuji-bonji/xcomet-mcp-server) |
| **npm**        | `@shuji-bonji/xcomet-mcp-server`                                                  |
| **目的**       | 翻訳品質の定量評価・エラー検出                                                    |
| **状態**       | ✅ 公開済み（★1、Fork 1）                                                         |

#### 主要ツール

| ツール                  | 機能                                               |
| ----------------------- | -------------------------------------------------- |
| `xcomet_evaluate`       | 翻訳品質スコア（0-1）とエラースパン検出            |
| `xcomet_detect_errors`  | エラーの詳細検出（severity: minor/major/critical） |
| `xcomet_batch_evaluate` | 複数翻訳ペアの一括評価                             |

#### 特徴

- モデル永続ロード（初期化後の高速推論）
- GPU対応
- バッチ処理対応

#### 成果

- 180ページ技術文書（150万文字）を1日で翻訳・品質評価
- 約$12のコスト（従来比1/100以下）

### rxjs-mcp-server

RxJSストリームの実行・可視化・分析を提供。

| 項目           | 内容                                                                          |
| -------------- | ----------------------------------------------------------------------------- |
| **リポジトリ** | [shuji-bonji/rxjs-mcp-server](https://github.com/shuji-bonji/rxjs-mcp-server) |
| **目的**       | RxJSコードの実行・マーブルダイアグラム生成・分析                              |
| **状態**       | ✅ 公開済み                                                                   |

#### 主要ツール

| ツール               | 機能                                     |
| -------------------- | ---------------------------------------- |
| `execute_stream`     | RxJSコードの実行と結果キャプチャ         |
| `generate_marble`    | ASCIIマーブルダイアグラム生成            |
| `analyze_operators`  | オペレーター分析・パフォーマンスチェック |
| `detect_memory_leak` | メモリリーク検出                         |
| `suggest_pattern`    | ユースケースに応じたパターン提案         |

### epsg-mcp

EPSG座標参照系データベースへのアクセスを提供。

| 項目           | 内容                                                            |
| -------------- | --------------------------------------------------------------- |
| **リポジトリ** | [shuji-bonji/epsg-mcp](https://github.com/shuji-bonji/epsg-mcp) |
| **目的**       | 座標系情報の検索・変換パラメータ取得                            |
| **状態**       | ✅ 公開済み                                                     |

### pwa-mcp

PWA（Progressive Web App）関連の支援を提供。

| 項目           | 内容                |
| -------------- | ------------------- |
| **リポジトリ** | shuji-bonji/pwa-mcp |
| **目的**       | PWA開発支援         |
| **状態**       | 🔒 Private          |

## 連携MCPサーバー

自作ではないが、ワークフローで連携しているMCP。

### deepl-mcp

| 項目       | 内容                                            |
| ---------- | ----------------------------------------------- |
| **提供元** | DeepL公式                                       |
| **用途**   | 高品質翻訳、用語集対応                          |
| **連携**   | xcomet-mcp-serverと組み合わせて翻訳ワークフロー |

#### 主要ツール

- `translate-text` - テキスト翻訳
- `translate-document` - ドキュメント翻訳
- `rephrase-text` - 言い換え
- 用語集（Glossary）対応

### hourei-mcp-server（e-gov-law-mcp）

| 項目       | 内容                                                            |
| ---------- | --------------------------------------------------------------- |
| **提供元** | [ryoooo/e-gov-law-mcp](https://github.com/ryoooo/e-gov-law-mcp) |
| **用途**   | 日本法令の検索・条文取得                                        |
| **連携**   | rfcxml-mcpと組み合わせて法令×技術仕様のマッピング               |

#### 主要ツール

- `search_law` - 法令検索
- `get_law_data` - 法令詳細取得
- `find_law_article` - 条文検索
- `get_law_revision` - 改正履歴

#### 成果

- 電子署名法 × RFC 3161 の対応表作成

### mermaid-mcp

| 項目     | 内容                                    |
| -------- | --------------------------------------- |
| **用途** | Mermaidダイアグラムの生成・レンダリング |
| **連携** | ドキュメント生成ワークフロー            |

### svelte-mcp / shadcn-svelte-mcp

| 項目     | 内容                                       |
| -------- | ------------------------------------------ |
| **用途** | Svelte/SvelteKit開発支援、UIコンポーネント |
| **連携** | フロントエンド開発                         |

## MCPカテゴリ別整理

```mermaid
graph TB
    subgraph 標準規格参照
        RFC[rfcxml-mcp<br/>IETF RFC]
        W3C[w3c-mcp<br/>Web標準]
        LAW[hourei-mcp<br/>日本法令]
    end

    subgraph "翻訳・品質"
        DEEPL[deepl-mcp<br/>翻訳]
        XCOMET[xcomet-mcp<br/>品質評価]
    end

    subgraph 開発支援
        RXJS[rxjs-mcp<br/>RxJS]
        SVELTE[svelte-mcp<br/>Svelte]
        SHADCN[shadcn-svelte<br/>UIコンポーネント]
    end

    subgraph 可視化
        MERMAID[mermaid-mcp<br/>図表生成]
    end

    subgraph 専門領域
        EPSG[epsg-mcp<br/>座標系]
        PWA[pwa-mcp<br/>PWA]
    end
```

## ワークフロー別MCP組み合わせ

### 技術文書翻訳ワークフロー

```mermaid
sequenceDiagram
    participant User as ユーザー
    participant Claude as Claude
    participant DeepL as deepl-mcp
    participant xCOMET as xcomet-mcp

    User->>Claude: 技術文書を翻訳して
    Claude->>DeepL: translate-text
    DeepL-->>Claude: 翻訳結果
    Claude->>xCOMET: xcomet_evaluate
    xCOMET-->>Claude: 品質スコア + エラー
    alt スコア < 0.85
        Claude->>DeepL: 再翻訳（修正）
    end
    Claude-->>User: 高品質翻訳
```

### RFC仕様確認ワークフロー

```mermaid
sequenceDiagram
    participant User as ユーザー
    participant Claude as Claude
    participant RFC as rfcxml-mcp
    participant W3C as w3c-mcp

    User->>Claude: WebSocketの仕様を確認して
    Claude->>RFC: get_rfc_structure(6455)
    RFC-->>Claude: セクション階層
    Claude->>RFC: get_requirements(6455)
    RFC-->>Claude: MUST/SHOULD要件
    Claude->>W3C: get_webidl("websockets")
    W3C-->>Claude: WebSocket API定義
    Claude-->>User: 仕様サマリー + チェックリスト
```

### 法令×技術仕様マッピングワークフロー

```mermaid
sequenceDiagram
    participant User as ユーザー
    participant Claude as Claude
    participant Hourei as hourei-mcp
    participant RFC as rfcxml-mcp

    User->>Claude: タイムスタンプ実装は電子署名法に準拠？
    Claude->>Hourei: find_law_article(電子署名法, 2)
    Hourei-->>Claude: 第2条の要件
    Claude->>RFC: get_requirements(3161)
    RFC-->>Claude: RFC 3161の技術要件
    Claude->>Claude: 法的要件 ↔ 技術要件マッピング
    Claude-->>User: 準拠状況レポート
```

## 構想中のMCP

| MCP              | 対象          | 優先度 | 備考                 |
| ---------------- | ------------- | ------ | -------------------- |
| **OpenAPI MCP**  | OpenAPI Spec  | 高     | API設計支援          |
| **OWASP MCP**    | OWASP Top 10  | 高     | セキュリティチェック |
| **Angular MCP**  | Angular       | 中     | 専門領域活用         |
| **NgRx MCP**     | NgRx          | 中     | 状態管理パターン     |
| **ISO MCP**      | ISO規格       | 中     | 国際標準参照         |
| **PDF Spec MCP** | ISO 32000     | 低     | PDF仕様参照          |
| **BIM/IFC MCP**  | buildingSMART | 低     | 建築情報モデル       |
| **HL7 FHIR MCP** | HL7 FHIR      | 低     | 医療情報交換         |

## npm公開状況

| パッケージ                       | バージョン | DL数 |
| -------------------------------- | ---------- | ---- |
| `@shuji-bonji/rfcxml-mcp`        | 公開済み   | -    |
| `@shuji-bonji/xcomet-mcp-server` | 公開済み   | -    |
| `@shuji-bonji/rxjs-mcp-server`   | 公開済み   | -    |

## 参考リンク

- [npm: @shuji-bonji](https://www.npmjs.com/~shuji-bonji)
- [GitHub: shuji-bonji](https://github.com/shuji-bonji)
