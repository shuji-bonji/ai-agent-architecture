# 用語集

> MCP・Agent 関連の用語と、前提となる LLM 基礎概念の参照先を定義する。

## このドキュメントについて

MCPエコシステムには多くの専門用語や略語が登場する。このドキュメントは、本ドキュメント群で使用される用語の定義を一箇所にまとめたリファレンスである。

初めてこのドキュメント群を読む人は、不明な用語があればここを参照することで理解を深められる。また、チーム内での共通言語として、用語の解釈を統一する役割も果たす。

## LLM 基礎概念（姉妹サイト参照）

本節の用語は、姉妹サイト [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/) が定義元である。ここには本サイトを読むのに必要な最小限の定義だけを置き、仕組みの説明と根拠は定義元へのリンクに委ねる。本サイト内の各ページで初めて出てくる箇所は、この節の項目にリンクしている。

### LLM（大規模言語モデル） {#llm}

Large Language Model の略。大量のテキストで学習し、次の語を予測して文章を生成するモデル。Claude や ChatGPT の中核がこれに当たる。本書が扱う AI とはの中心である。

**定義元**: 本書 [序章](./preface)。機序は姉妹サイト [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/) が担う。

### 基盤モデル（Foundation Model） {#foundation-model}

大量のデータで学習し、多様な下流タスクへ適用できるモデルの総称。LLM はその中心例である。Vision-Language-Action（VLA）など、言語以外の入出力を持つ隣接モデルを含む。

### トークン（Token） {#token}

LLM がテキストを処理する最小単位。文字でも単語でもなく、トークナイザーが分割した断片を指す。日本語は 1 文字あたり 1〜3 トークンになり、同じ内容でも英語より消費量が多い。

**定義元**: [Token・Context・Context Window — 3つの基礎概念](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/02-context-window/token-context-basics)

### コンテキスト（Context） {#context}

1 回の推論で LLM に渡される情報の全体。システムプロンプト、CLAUDE.md、会話履歴、ツール定義、ツールの実行結果をすべて含む。LLM はここに入っている情報だけを根拠に出力を生成する。

**定義元**: [Token・Context・Context Window — 3つの基礎概念](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/02-context-window/token-context-basics)

**関連**: [コンテキストウィンドウとは何か — LLM が「見る」もの](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/02-context-window/what-llm-sees)（コンテキストに入る要素と入らない要素の一覧）

### コンテキストウィンドウ（Context Window） {#context-window}

LLM が一度に処理できるコンテキストの上限（トークン数）。上限に達すると古い情報が入らなくなる。また上限に達しなくても、入力が増えるほど出力品質が下がる（→ Context Rot）。本サイトで「コンテキストを圧迫する」「コンテキスト消費」と書いているものは、この上限の使用量を指す。

**定義元**: [Token・Context・Context Window — 3つの基礎概念](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/02-context-window/token-context-basics)

**関連**: [コンテキスト予算という考え方](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/02-context-window/context-budget)（MCP ツール定義が上限のどれだけを占めるか）

### ステートレス（Stateless） {#stateless}

LLM は前回の推論の内容を保持しない。会話が続いているように見えるのは、アプリケーション側が会話履歴をコンテキストに毎回詰め直しているためである。セッションをまたいで「覚えさせる」には、ファイルなどコンテキスト外の場所に書き出す必要がある。

**定義元**: [Token・Context・Context Window — 「ステートレス」の意味](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/02-context-window/token-context-basics)

**関連**: [なぜメモリが問題になるのか](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/08-session-management/memory-problem)

### システムプロンプト（System Prompt） {#system-prompt}

コンテキストの先頭に常時置かれ、LLM の役割・制約・振る舞いを定める指示。Claude Code では内部のシステムプロンプトに加え、CLAUDE.md がこの位置に注入される。サブエージェント定義ファイルの本文は、そのサブエージェント専用のシステムプロンプトになる。

**定義元**: [コンテキストウィンドウとは何か — LLM が「見る」もの](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/02-context-window/what-llm-sees)

### セッション（Session） {#session}

コンテキストが蓄積していく 1 つの会話単位。ターンを重ねるごとにコンテキストは増え続け、減ることはない。Claude Code では `/compact` で履歴を要約して圧縮し、`/clear` でセッションを区切る。

**定義元**: [Chat / Session — Context が蓄積する「時間の入れ物」](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/02-context-window/chat-session)

**関連**: [/compact と /clear の使い分け](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/08-session-management/compact-and-clear)

### LLM の構造的問題（8 項目） {#structural-problems}

LLM の仕組みに由来し、プロンプトの工夫だけでは解消しない問題群。本サイトの設計判断（サブエージェント分離、Skills のオンデマンド化、MCP ツール定義の遅延ロードなど）は、いずれもこの 8 項目のどれかへの対処として位置づけられる。

| 用語                                  | 最小定義                                                                         | 定義元                                                                                                                                       |
| ------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context Rot**                       | 入力トークン数が増えるほど出力品質が下がる                                       | [context-rot](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/01-llm-structural-problems/context-rot)                 |
| **Lost in the Middle**                | コンテキスト中間部の情報が参照されにくくなる                                     | [lost-in-the-middle](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/01-llm-structural-problems/lost-in-the-middle)   |
| **Priority Saturation**               | 同時に与える指示が増えるほど、個々の指示の遵守率が下がる                         | [priority-saturation](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/01-llm-structural-problems/priority-saturation) |
| **Instruction Decay**                 | 会話が長くなるほど、初期の指示の遵守率が下がる                                   | [instruction-decay](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/01-llm-structural-problems/instruction-decay)     |
| **Hallucination（ハルシネーション）** | 事実に反する内容を、根拠があるかのように生成する                                 | [hallucination](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/01-llm-structural-problems/hallucination)             |
| **Sycophancy（迎合）**                | 正確さよりユーザーへの同意を優先する                                             | [sycophancy](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/01-llm-structural-problems/sycophancy)                   |
| **Knowledge Boundary（知識境界）**    | 学習データの時点で知識が固定され、かつ自分が知らないことを「知らない」と言えない | [knowledge-boundary](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/01-llm-structural-problems/knowledge-boundary)   |
| **Prompt Sensitivity**                | 意味が同じプロンプトでも、書き方の違いで出力が変わる                             | [prompt-sensitivity](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/01-llm-structural-problems/prompt-sensitivity)   |

**一覧と相互関係**: [Part 1: LLMの構造的制約を知る](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/01-llm-structural-problems/)

> 本サイトで「学習データの時点で固定される」「最新性の制約」と書いているものは Knowledge Boundary を指す。[01-vision](./concepts/01-vision) の 4 制約（正確性・最新性・権威性・責任性）のうち、正確性は Hallucination、最新性は Knowledge Boundary に対応する。権威性・責任性は LLM の構造ではなく制度の問題であり、姉妹サイトの範囲外である。

### Tool Search / Deferred Loading {#tool-search}

MCP ツール定義を起動時に全件コンテキストへ載せず、必要になった時点で読み込む仕組み。ツール定義はコンテキストウィンドウの固定費になるため、MCP サーバーを増やすほどこの仕組みの有無が問題になる（→ Over-MCPization）。

**定義元**: [Tool Search / Deferred Loading](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/06-tool-context/tool-search)

**関連**: [MCP のコンテキストコスト](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/06-tool-context/mcp-context-cost)

### ハーネス（Harness） {#harness}

LLM の周囲に置く、ツール連携・メモリ・安全制御・ループ制御の 4 要素の総称。LLM 本体を変えずに、構造的問題の影響を外側から抑える。本サイトの 5 層モデルとの対応は [harness-engineering-mapping](./strategy/harness-engineering-mapping) を参照。

**定義元**: [Harness と LLM の構造的制約 — 処方の前に診断を](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/appendix/harness-and-llm-constraints)

### 重み（Weights） {#weights}

学習によって決まる LLM 内部のパラメータ。推論時には変わらない。モデルに専門性を持たせる方法は「重みを変える（Fine-tuning）」か「コンテキストに入れる（Skills / MCP / RAG）」の 2 系統に分かれる。

**定義元**: 本サイト [specialization-weights-vs-context](./strategy/specialization-weights-vs-context)（姉妹サイトに専用ページがないため本サイトで定義する）

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

**定義元（姉妹サイト）**: [Part 5: Agents](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/05-on-demand-context/agents)

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

**定義元（姉妹サイト）**: [Part 5: Skills](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/05-on-demand-context/skills)

### CLAUDE.md

プロジェクトルートに配置する、Claudeへの指示ファイル。

```
内容:
- プロジェクト概要
- 使用MCP一覧
- コーディング規約
- ワークフロー指示
```

**定義元（姉妹サイト）**: [Part 3: 常駐コンテキスト — CLAUDE.md](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/03-always-loaded-context/claude-md)

## エージェント分類

エージェント用語を抽象レベルで整理した分類。詳細は [agent-taxonomy.md](./agents/agent-taxonomy.md) を参照。

### 設計パターン（Architecture Pattern）

エージェントの組み合わせ方を示すアーキテクチャ・パターン。

| パターン                | 説明                                           |
| ----------------------- | ---------------------------------------------- |
| **Orchestrator-Worker** | 統括役が複数の Worker にタスクを委任する階層型 |
| **Hierarchical Team**   | 階層を明示した複数エージェントのチーム         |
| **Swarm**               | 階層を最小化し、ハンドオフで協調する自律分散型 |

### メタエージェント（Meta Agent）

エージェントを動的に生成・管理するエージェント、という設計コンセプト。

```
注意:
- 特定の製品機能名ではない
- Orchestrator が動的にサブエージェントを spawn する形態の総称
- 「Meta-Agent Builder」のような確立した製品名は存在しない
```

**関連**: Orchestrator、Spawned Agent

### 実行ロール（Execution Role）

設計パターンの内側で、各エージェントが担う責務。

| ロール                                     | 責務                           |
| ------------------------------------------ | ------------------------------ |
| **Orchestrator / Supervisor / Lead Agent** | タスク分解、委任判断、結果集約 |
| **Planner**                                | 計画立案、ステップ分解         |
| **Worker / Specialist**                    | 個別の専門タスクを実行         |
| **Critic / Reviewer / Evaluator**          | 出力の検証、採点、再実行判断   |

Anthropic の Multi-Agent Research System では Orchestrator にあたるエージェントを **"lead agent"** と呼ぶ。

### バックグラウンドエージェント（Background Agent）

非同期・長時間実行されるエージェント。セッションを跨いで状態を保持できる。

```
特徴:
- 長時間実行に耐える
- Persistent な状態を持つ
- ユーザー操作を妨げない

例:
- GitHub Copilot Cloud Agents
```

### Ephemeral / Persistent

エージェントのライフサイクル属性。

| 属性                 | 意味                                                      |
| -------------------- | --------------------------------------------------------- |
| **Persistent**       | セッションを跨いで状態を保持                              |
| **Ephemeral**        | タスク完了時に破棄。コンテキスト汚染防止に寄与            |
| **Spawned / Forked** | 親から動的に生成される（多くは Ephemeral と組み合わさる） |

### AGENTS.md

リポジトリルートに置く、コーディングエージェント向けの README。

```
特徴:
- Markdown 形式の標準
- 2025年12月に OpenAI と Anthropic が Linux Foundation
  （Agentic AI Foundation）へ寄贈し、業界標準化
- 60,000+ プロジェクトで採用（2025年末時点）
```

**注意**: 個別エージェント定義の `.agent.md` とは別物。

### .agent.md

GitHub Copilot / VS Code Custom Agents の**個別カスタムエージェント定義**ファイル。

```
配置場所:
- .github/agents/*.agent.md（ワークスペース）
- ~/.copilot/agents/*.agent.md（ユーザー）

旧称: Custom Chat Modes
```

**注意**: リポジトリ全体への指示ファイル `AGENTS.md` とは別物。

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

## AI設計パターン

### RAG（Retrieval-Augmented Generation：検索拡張生成）

外部のドキュメントをベクトル検索し、関連情報をLLMのプロンプトに注入する手法。

```
仕組み:
1. ドキュメントをチャンク分割 → ベクトル化 → DB格納
2. ユーザーの質問をベクトル化
3. 類似度検索で関連チャンクを取得
4. チャンクをプロンプトに注入してLLMが回答生成

強み: 大量の非構造化テキストから関連情報を見つけられる
弱み: チャンク分割で文脈が失われる、構造を理解しない
```

**関連**: Embedding、ベクトルDB、チャンク

> **MCPとの違い**: [concepts/04-ai-design-patterns.md](./concepts/04-ai-design-patterns) を参照

### Embedding（エンベディング）

テキストを数値ベクトル（数百〜数千次元の配列）に変換すること。意味的に近いテキストは、ベクトル空間上でも近くに配置される。RAGのベクトル検索の基盤技術。

### ベクトルDB（Vector Database）

Embeddingされたベクトルデータを格納・検索するための専用データベース。コサイン類似度等を用いた高速な類似度検索を提供する。

```
例: Pinecone、Weaviate、Chroma、pgvector
```

### チャンク（Chunk）

ドキュメントを小さな断片に分割したもの。RAGでは、ドキュメントをチャンクに分割してからベクトル化する。チャンクのサイズや分割方法が検索精度に影響する。

### Prompt Engineering（プロンプトエンジニアリング）

モデルのパラメータを変えず、入力プロンプトの工夫だけで出力品質を制御する手法。Zero-shot、Few-shot、Chain-of-Thoughtなどの技法がある。

### GraphRAG

通常のRAGにナレッジグラフ（知識グラフ）を組み合わせ、エンティティ間の関係性を活用して検索・生成を行う手法。「AはBにどう関係するか」といった関係性の質問に強い。

### Fine-tuning（ファインチューニング）

LLMのパラメータ自体を、特定ドメインのデータで追加学習させる手法。RAGが「外部記憶」なら、Fine-tuningは「内部知識の書き換え」に近い。

### Agentic AI（エージェント型AI）

LLMが自律的に計画を立て、ツールを呼び出し、複数ステップで問題を解決するパターン。MCPはこのパターンを支える基盤技術の一つ。

**関連**: MCP、サブエージェント、A2A

## その他

### ワールドモデル（World Model）

環境の構造や物理法則に関するエージェントの内部表現。エージェントが「次に何が起こるか」を予測し、行動の結果をシミュレーションするための基盤となる概念。

```
文脈:
- ロボティクス・自動運転: 物理法則（重力、慣性、衝突）の内部モデル
- LLM: テキストの因果関係や世界の常識的な振る舞いの暗黙的理解
- 強化学習: 環境のダイナミクスモデル（model-based RL）
```

本サイトでは主に[フィジカルAI](./concepts/06-physical-ai#ワールドモデルの重要性)の文脈で扱う。情報空間のエージェントにおいても暗黙的に存在するが、物理世界で行動するエージェントにとっては不可欠な要素である。

**参考**: [Yann LeCun — A Path Towards Autonomous Machine Intelligence (2022)](https://openreview.net/pdf?id=BZ5a1r-kVsf)

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

**関連（姉妹サイト）**: [MCP のコンテキストコスト](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/06-tool-context/mcp-context-cost)、[Tool Search / Deferred Loading](#tool-search)

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
| RAG      | Retrieval-Augmented Generation                     | 検索拡張生成                       |
| MCP      | Model Context Protocol                             | AIとツールの接続プロトコル         |
| A2A      | Agent-to-Agent Protocol                            | エージェント間通信プロトコル       |
| RFC      | Request for Comments                               | IETF技術標準文書                   |
| IETF     | Internet Engineering Task Force                    | インターネット技術標準化団体       |
| W3C      | World Wide Web Consortium                          | Web標準化団体                      |
| WHATWG   | Web Hypertext Application Technology Working Group | HTML等の標準化団体                 |
| API      | Application Programming Interface                  | アプリケーション間インターフェース |
| JSON-RPC | JSON Remote Procedure Call                         | JSONベースのRPCプロトコル          |
| ADK      | Agent Development Kit                              | エージェント構築用 SDK             |
| ADR      | Architecture Decision Record                       | アーキテクチャ決定記録             |
| TLS      | Transport Layer Security                           | 通信暗号化プロトコル               |
| TSA      | Time Stamp Authority                               | タイムスタンプ局                   |
