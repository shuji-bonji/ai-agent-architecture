---
title: "MCPとは？Model Context Protocolの仕組みとAIエージェントでの活用"
description: "MCP（Model Context Protocol）はAnthropicが策定したAIエージェント連携の標準規格です。MCPサーバーの仕組み、Claude CodeやCursorでの使い方、Skillsとの違いをわかりやすく解説します。"
head:
  - - meta
    - property: "og:title"
      content: "MCPとは？Model Context Protocolの仕組みとAIエージェントでの活用"
  - - meta
    - property: "og:description"
      content: "MCP（Model Context Protocol）はAnthropicが策定したAIエージェント連携の標準規格です。MCPサーバーの仕組み、Claude CodeやCursorでの使い方、Skillsとの違いをわかりやすく解説します。"
  - - meta
    - name: "twitter:card"
      content: "summary_large_image"
---

# MCPとは何か

> AIエージェントが外部ツールやデータに安全にアクセスするための標準プロトコル

## このドキュメントについて

MCPの基本概念、種類、メリット・デメリットを包括的に解説する。MCPを初めて学ぶ場合はここから始め、具体的な構築方法は [development.md](./development.md) を参照してください。

## MCPとは何か

**MCP（Model Context Protocol）** は、Anthropicが主導するオープン標準プロトコルである。

一言で言うなら、「**AIエージェントが外部ツール・データに安全にアクセスするための共通プロトコル**」である。

### USB-Cの比喩

USB-Cが様々なデバイス（マウス、キーボード、外付けドライブ等）とPCを1つの規格で接続するように、MCPは様々なツール・サービス（RFC仕様、翻訳API、法令DB等）だけでなく、**物理デバイスやセンサー（IoTデバイス、スキャナー、OCR等）** もAIと1つのプロトコルで接続する。

### 本質：AIに「手」を与える仕組み

AIはテキスト入出力に優れているが、デフォルトではネットワークアクセスやファイル操作といった「外部とのインタラクション」ができない。MCPはこの制限を標準化された方法で解決し、AIに「手」を与える仕組みである。

## なぜMCPが必要か

### 課題：AIの知識限界と動的データへのアクセス不可

AIは学習データの範囲内でしか回答できない。

例えば、

- 最新のRFC仕様（RFC 6455以降）を知らない
- DeepLやGoogleTranslateなどの翻訳サービスを使えない
- 法令DBや特定の知識ベースを検索できない

### MCP以前：N×M問題

MCP以前は、各AIツール（Claude Code、Cursor、VS Code等）が各サービス（RFC、翻訳、法令等）と個別に統合する必要があった。

```
N個のAIツール × M個のサービス = N×M個の統合が必要
```

### MCP以後：N+M問題に削減

MCPの標準化により、各サービスが1つのMCPサーバーを公開すれば、すべてのAIツールで自動的に利用可能になる。

```
N個のAIツール + M個のMCPサーバー = N+M個の実装で完結
```

### LSP：MCPの構造的先祖

この N×M → N+M の削減は、実は新しい発想ではない。**LSP（Language Server Protocol）** は 2016 年に Microsoft が導入し、1 つ下のレイヤーで同型の問題を解いていた。LSP 以前は、N 個のエディタで M 個の言語をサポートするには N×M 個のプラグインが必要だったが、LSP はエディタ↔言語サーバー間の通信を **JSON-RPC 2.0**（MCP が今日使うのと同じトランスポート）で標準化し、これを N+M に畳んだ。

> [!TIP]
> MCP は実質「LLM にとっての LSP」である。Microsoft の VS Code チームは次のように明言している ——「*LSP の背後にあるアイデアが、新しいプロトコル MCP に着想を与えた。MCP はアプリケーションが LLM にコンテキストを提供する方法を標準化する*」。LSP がエディタをコードインテリジェンスに繋ぐのに対し、MCP は LLM を任意のツール・データに繋ぐ。この系譜を認識すると、MCP の Host/Client/Server 分離が LSP の Editor/Client/Server 分離を写し取っている理由が見えてくる。逆方向も既に起きており、`lsp-mcp` や Serena は LSP の能力を MCP サーバーとして LLM に再公開し、Claude Code も 2025 年後半にネイティブ LSP プラグイン（`pyright-lsp` / `vtsls` / `rust-analyzer` 等）を追加した。

参考文献: VS Code Team (2025). "Agent mode: available to all users and supports MCP." Visual Studio Code Blog. [code.visualstudio.com](https://code.visualstudio.com/blogs/2025/04/07/agentMode) — LSP の LLM 時代の後継としての MCP。

## MCPの3層構造

MCPは3層の明確な役割分担で構成される。

```mermaid
block-beta
    columns 1

    block:HOST_BLOCK:1
        HOST["Host（ホストアプリケーション）<br/>Claude Code, Cursor, VS Code"]
    end

    block:CLIENT_BLOCK:1
        CLIENT["Client（MCPクライアント）<br/>Host内蔵 / プロトコル処理"]
    end

    block:SERVER_BLOCK:1
        SERVER["Server（MCPサーバー）<br/>ツール・リソース提供 / 実際の処理"]
    end

    HOST --> CLIENT
    CLIENT --"JSON-RPC 2.0"--> SERVER

    style HOST fill:#87CEEB,color:#333,stroke:#333
    style CLIENT fill:#FFE4B5,color:#333,stroke:#333
    style SERVER fill:#FFB6C1,color:#333,stroke:#333
```

### 各層の役割と開発者の関わり

各層がどのような役割を担い、開発者としてどこに関わるかを以下にまとめる。

| 層         | 役割                                        | 例                           | 開発者の関わり   |
| ---------- | ------------------------------------------- | ---------------------------- | ---------------- |
| **Host**   | UI、セッション管理、ユーザーインタフェース  | Claude Code, Cursor, VS Code | 使う側           |
| **Client** | JSON-RPC通信処理、リクエスト/レスポンス変換 | Host内蔵                     | 通常は意識しない |
| **Server** | ツール/リソース提供、実際の処理実装         | rfcxml-mcp, deepl-mcp        | **作る側**       |

### 重要なポイント

**MCPサーバーを開発する立場では、Serverレイヤーのみを実装する。** ClientはHostに内蔵されているため、プロトコル詳細を意識する必要はない。

## 外部接続 I/F カタログ — 全 I/F の中での MCP の位置

MCP は「外部に繋ぐ手段」の 1 つに過ぎない。エージェントが外部に触れるのは常に**ハーネス（の手先）**であり、MCP・直接 HTTP・A2A・プラグインはどれも「ハーネスのツール連携責務の中身」の分類でしかない（→ [strategy/harness-engineering-mapping](../strategy/harness-engineering-mapping) の大原則）。MCP を設計する前に、**全 I/F の棚の中で MCP がどこに位置するか**を俯瞰しておく。

| 接続先 | I/F の例 | 主体 |
| --- | --- | --- |
| **モデル（脳）** | OpenAI 互換 API ／ LLM Gateway（LiteLLM, OpenRouter） | ハーネス → ゲートウェイ |
| **ツール・データ** | 直接 HTTP/REST/SDK ／ **MCP** | ハーネス（の手先） |
| **知識・検索（retrieval）** | Web 検索（SearXNG, Brave, Tavily）／ ベクトル DB・RAG ／ Memory・Knowledge Graph | ハーネス |
| **別エージェント** | **A2A**（Agent Card + Task, client / server アダプタ） | ハーネス ↔ アダプタ |
| **GUI・物理** | ブラウザ自動操作 ／ コンピュータ操作 ／ IoT（MQTT, Home Assistant） | ハーネス |
| **人間・イベント** | webhook ／ message queue ／ push 通知 ／ chat bot | ハーネス |

> [!TIP]
> 名前のある“勝ち組プロトコル”は実質 **MCP（ツール）と A2A（エージェント）の 2 枚** に集約される。それ以外は **(a) その場の HTTP 直叩き ／ (b) retrieval（検索・ベクトル・記憶）／ (c) GUI・物理を触る系** に落ちる。すべての土台に**モデルへの I/F（LLM Gateway）**がある。MCP を選ぶ判断は、この棚の「ツール・データ」行で **直接 HTTP との二択**になる。

> [!NOTE]
> **プラグインは「種類」ではなく梱包**。Claude / Cowork のプラグインは **MCP サーバ + Skill + コマンドを束ねた配布物**で、「プラグインを使う」時も実際はハーネスが**中の MCP ツール / Skill を関数として呼ぶ**だけ。「プラグインで実装」＝「中身（MCP / Skill）をハーネスが呼ぶ」。

A2A だけは**呼ぶ／呼ばれるで前後が反転する**（outbound ではハーネスの手先、inbound では入口）点に注意する（→ [agents/what-is-a2a](../agents/what-is-a2a)）。次節以降は、この棚の中で **MCP（ツール接続）** に絞って種類と実装を掘り下げる。

## MCPの種類・カテゴリ分類

MCPサーバーは**2つの軸**で分類できる。「何をするか」（目的別）と「どう実装するか」（実装パターン別）である。

### 目的別分類（Purpose-based）

MCPの用途は「ブレない参照先」だけではない。実際には、MCPは以下の6つの目的カテゴリに分類される。

| カテゴリ | 役割 | 例 |
| --- | --- | --- |
| **Reference（参照）** | 権威ある仕様・規格・法令への構造的アクセス | rfcxml-mcp, w3c-mcp, hourei-mcp, pdf-spec-mcp |
| **Transform（変換）** | データ形式や言語の変換処理 | deepl-mcp, mermaid-mcp |
| **Evaluate（評価）** | 品質・スコアの測定 | xcomet-mcp |
| **Verify（検証）** | 仕様準拠の確認 | rfcxml-mcp（validate_statement等） |
| **Execute（実行）** | ドメイン固有の処理実行 | rxjs-mcp, pdf-reader-mcp |
| **Retrieve（取得）** | 汎用的な外部データ取得 | epsg-mcp |

> **重要：** 1つのMCPが複数のカテゴリにまたがることがある。例えば `rfcxml-mcp` は **Reference**（仕様参照）と **Verify**（準拠検証）の両方を担う。

```mermaid
mindmap
  root((MCP<br/>目的別分類))
    Reference
      rfcxml-mcp
      w3c-mcp
      hourei-mcp
      pdf-spec-mcp
    Transform
      deepl-mcp
      mermaid-mcp
    Evaluate
      xcomet-mcp
    Verify
      rfcxml-mcp
    Execute
      rxjs-mcp
      pdf-reader-mcp
    Retrieve
      epsg-mcp
```

### 実装パターン別分類（Implementation-based）

一方、技術的な実装の観点では、MCPサーバーは4つのパターンに分類される。

| パターン             | 特徴                                   | 例                                 |
| -------------------- | -------------------------------------- | ---------------------------------- |
| **ローカルデータ型** | 外部通信なし、データをパッケージに内包 | epsg-mcp, pdf-spec-mcp             |
| **外部API型**        | HTTP/HTTPSで外部APIと通信              | rfcxml-mcp, w3c-mcp, hourei-mcp    |
| **モデルロード型**   | 機械学習モデルをロードしてローカル推論 | xcomet-mcp-server                  |
| **ハイブリッド型**   | 複数パターンの組み合わせ               | pdf-reader-mcp（ローカル+URL取得） |

### 2軸の関係

目的別と実装パターン別は**独立した軸**である。例えば「Reference（参照）」目的のMCPでも、ローカルデータ型（pdf-spec-mcp）と外部API型（rfcxml-mcp）がある。MCPを設計する際は、まず「何を実現したいか」（目的）を明確にし、次に「どう実装するか」（パターン）を選定するとよい。

### 実装パターン選定フローチャート

新しいMCPサーバーを構築する際、どの実装パターンに当てはまるかは以下のフローチャートで判断できる。

```mermaid
flowchart TD
    Q1{外部APIが必要?}
    Q1 -->|Yes| Q2{リアルタイム性が必要?}
    Q1 -->|No| Q3{MLモデルが必要?}
    Q2 -->|Yes| API["外部API型"]
    Q2 -->|No| HYBRID["ハイブリッド型"]
    Q3 -->|Yes| MODEL["モデルロード型"]
    Q3 -->|No| LOCAL["ローカルデータ型"]

    style API fill:#FFB6C1,color:#333,stroke:#333
    style MODEL fill:#87CEEB,color:#333,stroke:#333
    style LOCAL fill:#90EE90,color:#333,stroke:#333
    style HYBRID fill:#FFE4B5,color:#333,stroke:#333
```

## MCPサーバーが提供する主要機能

MCPサーバーは3つのコア機能を提供する。

### Tools（ツール）- 最も一般的

AI が呼び出せる関数。リモートプロシージャコール（RPC）的な仕組み。

**例：**

- `rfcxml:get_rfc_structure` - RFC仕様の構造を取得
- `deepl:translate-text` - テキストを翻訳
- `xcomet:xcomet_evaluate` - 翻訳品質を評価

### Resources（リソース）

AIが読み取れるデータソース。URIベースでアクセス可能。

**例：**

- `file:///path/to/data` - ファイルシステムのデータ
- `rfc://6455` - RFC仕様書本体

### Prompts（プロンプトテンプレート）

再利用可能なプロンプト定義。一連の作業フローをテンプレート化。

**例：**

- 翻訳品質評価用テンプレート
- コードレビュー用テンプレート

### 機能比較表

これら3つの機能の違いを以下の表に整理する。

| 機能          | データ方向  | 説明                           | 利用頻度       |
| ------------- | ----------- | ------------------------------ | -------------- |
| **Tools**     | AI → Server | AIがサーバーの関数を呼ぶ       | ★★★ 最も一般的 |
| **Resources** | Server → AI | サーバーがUIなしでデータを提供 | ★★ 中程度      |
| **Prompts**   | Server → AI | テンプレート提供               | ★ 限定的       |

## 追加ユーティリティ機能

MCPプロトコルには、コア機能（Tools/Resources/Prompts）に加えて以下のユーティリティ機能が定義されている。すべてが必須ではないが、高度なユースケースで有用になる。

### Sampling

サーバーが逆方向でAIに推論を依頼する機能。複雑な判断をAIに委譲したい場合に有用。

### Roots

サーバーがアクセスできるファイルシステムの範囲を制限する機能。セキュリティの観点から重要。

### Logging

構造化ログ出力。デバッグやモニタリング用。

### Progress

長時間処理の進捗報告。ユーザーエクスペリエンス向上のため。

### 実装のポイント

多くのMCPサーバーは **Toolsのみで十分機能する。** 追加機能は必要に応じて段階的に追加するアプローチが効率的。

## メリット

MCPを採用することで、以下のメリットが得られる。

- ✅ **標準化**  
  一度作れば複数のAIホスト（Claude Code, Cursor, VS Code等）で利用可能。プロトコルの統一により、各ツール側の統合コストが大幅削減。

- ✅ **再利用性**  
  npmで公開すれば誰でも `npx` で即座に利用開始可能。デプロイと運用が非常に簡単。

- ✅ **動的処理**  
  リアルタイムのデータ取得・処理が可能。AIの知識の古さを補完。

- ✅ **権威性**
  RFC原文、法令DB等の「ブレない参照先」に直接アクセス。AIの幻覚を低減。これはMCPの目的の一つ（Reference）であり、他にも変換・評価・検証・実行・取得といった多様な用途がある。

- ✅ **関心の分離**  
  ツール側のロジックとAI側のロジックが明確に分離。両者の変更の影響が限定的。

## デメリット・リスク

一方で、MCPには注意すべきデメリットとリスクもある。

- ❌ **コンテキスト消費**
  ツール定義の読み込みだけでトークンを消費。特にツール数が多い場合、コンテキストウィンドウを圧迫する可能性あり。

- ❌ **起動コスト**
  サーバープロセスの起動・管理が必要。シンプルなケースでは過剰複雑度を招く。

- ❌ **セキュリティリスク**
  入力検証不足や権限管理の誤りが深刻な被害に。詳細は [security.md](./security.md) 参照。

- ❌ **メンテナンスコスト**
  外部APIの変更への追従が必要。長期運用を考慮した設計が必須。

- ❌ **過剰MCP化**
  すべてをMCP化する誘惑に注意。CLI + Skillで十分なケースも多い。

### Key Insight

> 公式CLIがあるサービス（gh, aws, gcloud等）は MCPなし、**CLI + Skill** が効率的である。判断軸は [03-architecture.md](../concepts/03-architecture.md)「CLI vs MCP」を参照。

## このリポジトリでのMCP実績

このai-agent-architectureリポジトリでは、MCPの実践的な開発と運用の知見を蓄積している。

### 自作MCP（npm公開済み）

7つのMCPサーバーを設計・実装・公開

- **rfcxml-mcp** - IETF RFC仕様の検索・取得
- **w3c-mcp** - W3C/WHATWG Web仕様の検索・参照
- **xcomet-mcp** - 翻訳品質評価（機械学習モデル利用）
- **rxjs-mcp** - RxJS操作ガイド・コード実行
- **epsg-mcp** - 座標参照系（CRS）の検索・変換
- **pdf-spec-mcp** - PDF仕様（ISO 32000）の検索
- **pdf-reader-mcp** - PDF読み込み・テキスト抽出

### 連携MCP（外部開発）

5つのMCPサーバーと連携・拡張

- **deepl-mcp** - DeepL翻訳API
- **hourei-mcp** - 日本法令データベース
- **mermaid-mcp** - Mermaid図生成
- **svelte-mcp** - Svelte 5ドキュメント
- **shadcn-svelte-mcp** - shadcn/ui v4コンポーネント

### さらに詳しく

MCP一覧・詳細仕様は [catalog.md](./catalog.md) を参照。

## 次に読むべきドキュメント

MCPについてさらに深く学ぶために、以下のドキュメントを参照してほしい。

| 目的                         | ドキュメント                                         |
| ---------------------------- | ---------------------------------------------------- |
| **MCPを作りたい**            | [development.md](./development.md)                   |
| **構築済みMCPを見たい**      | [catalog.md](./catalog.md)                           |
| **セキュリティを理解したい** | [security.md](./security.md)                         |
| **Skills/A2Aとの使い分け**   | [03-architecture.md](../concepts/03-architecture.md) |
| **Skillsについて知りたい**   | [what-is-skills.md](../skills/what-is-skills.md)     |

**最終更新:** 2026-06-20
**リポジトリ:** [ai-agent-architecture](https://github.com/shuji/ai-agent-architecture)
