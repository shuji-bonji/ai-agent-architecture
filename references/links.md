# 参考リンク・資料

## MCP公式

- [Model Context Protocol](https://modelcontextprotocol.io/) - 公式サイト
- [MCP Specification](https://spec.modelcontextprotocol.io/) - プロトコル仕様
- [MCP Registry](https://github.com/mcp) - 公式レジストリ
- [MCP Servers (Reference)](https://github.com/modelcontextprotocol/servers) - リファレンス実装

## MCP開発リソース

- [Claude Code MCP ドキュメント](https://code.claude.com/docs/ja/mcp) - Claude Code連携
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - コミュニティリスト
- [Microsoft MCP](https://github.com/microsoft/mcp) - Microsoft公式MCPサーバー群

## 標準規格・仕様

### 通信プロトコル
- [IETF RFC](https://www.rfc-editor.org/) - RFC Editor
- [W3C Standards](https://www.w3.org/standards/) - Web標準

### API設計
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [AsyncAPI Specification](https://www.asyncapi.com/docs/reference/specification/latest)
- [JSON:API](https://jsonapi.org/)

### セキュリティ
- [OWASP](https://owasp.org/) - Web Application Security
- [NIST Cybersecurity](https://www.nist.gov/cybersecurity)
- [CVE/NVD](https://nvd.nist.gov/) - 脆弱性データベース

### 品質・アクセシビリティ
- [ISO 25010](https://www.iso.org/standard/35733.html) - ソフトウェア品質
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) - アクセシビリティ

## Agentic AI — アイデンティティとガバナンス

AIエージェントを Non-Human Identity（NHI）として独立したIDで管理する動向。`docs/ja/agents/` 配下のページから参照する一次資料群。

### 一次資料・横断的解説

- [Identity Management for Agentic AI v1.1（日本語版）](https://www.openid.or.jp/Identity-Management-for-Agentic-AI-jp_v1.1.pdf) - OpenID Foundation Japan, 2025年10月, Tobin South 編集
- [Identity Management for Agentic AI（原文・英語 PDF）](https://openid.net/wp-content/uploads/2025/10/Identity-Management-for-Agentic-AI.pdf) - OpenID Foundation
- [Identity Management for Agentic AI（arXiv プレプリント）](https://arxiv.org/abs/2510.25819) - 2510.25819, 同内容のアカデミック版
- [OWASP Non-Human Identity Top 10](https://owasp.org/www-project-non-human-identities-top-10/) - NHI脅威モデル（2025年6月リリース）
- [C2PA - Coalition for Content Provenance and Authenticity](https://c2pa.org/) - コンテンツ来歴・改ざん検知

### IAM プロトコル仕様

- [OAuth 2.1 Draft](https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/)
- [RFC 8707 - Resource Indicators](https://datatracker.ietf.org/doc/html/rfc8707) - MCP認可で必須化
- [RFC 7636 - PKCE (Proof Key for Code Exchange)](https://datatracker.ietf.org/doc/html/rfc7636)
- [RFC 8693 - OAuth 2.0 Token Exchange](https://datatracker.ietf.org/doc/html/rfc8693) - スコープ減衰の一元管理型
- [CIBA - OpenID Connect Client-Initiated Backchannel Authentication](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html) - エージェントの非同期認可
- [SCIM 2.0 - RFC 7644](https://datatracker.ietf.org/doc/html/rfc7644) - ID ライフサイクル管理
- [SPIFFE / SPIRE](https://spiffe.io/) - ワークロードアイデンティティ
- [W3C DIDs - Decentralized Identifiers](https://www.w3.org/TR/did-core/) - 主権・ポータブルID
- [Web Bot Auth (IETF Draft)](https://datatracker.ietf.org/doc/draft-meunier-web-bot-auth-architecture/) - ブラウザ操作型エージェントのHTTP署名認証

### OpenID Foundation ワーキンググループ

- [IPSIE - Interoperability Profiling for Secure Identity in Enterprise](https://openid.net/wg/ipsie/) - 企業向けセキュリティプロファイル
- [AuthZEN - Authorization API Working Group](https://openid.net/wg/authzen/) - PEP/PDP通信プロトコル
- [Shared Signals Framework](https://openid.net/wg/sharedsignals/) - 失効伝播・セキュリティイベント
- [OpenID Federation](https://openid.net/specs/openid-federation-1_0.html) - フェデレートされた信頼

### 商用エージェントID実装

- [Microsoft Entra Agent ID](https://learn.microsoft.com/en-us/entra/agent-id/) - 2026年4月 GA
- [Okta AI Agents](https://www.okta.com/customer-identity/) - エージェント向けID管理
- [AWS Bedrock Agents](https://aws.amazon.com/bedrock/agents/) - エージェント単位のIAMロール

### A2A プロトコル

- [Agent2Agent (A2A) Protocol](https://a2a-protocol.org/latest/) - 公式サイト
- [A2A on GitHub](https://github.com/a2aproject/A2A) - 仕様とリファレンス実装
- [Linux Foundation Agentic AI](https://www.linuxfoundation.org/projects) - A2A の管理体制
- [Agent Payments Protocol (AP2)](https://ap2-protocol.org/) - エージェント主導の商取引（公式ドキュメント）
- [AP2 GitHub Repository](https://github.com/google-agentic-commerce/AP2) - Apache 2.0 ライセンスの仕様・SDK

### MCP 認可仕様

- [MCP Authorization Specification](https://modelcontextprotocol.io/specification/draft/basic/authorization)
- [MCP Specification Release Notes](https://blog.modelcontextprotocol.io/) - OAuth 2.1 + PKCE + RFC 8707 統合

### 高リスクユースケース

- [FAPI 1.0 / 2.0](https://openid.net/wg/fapi/) - OpenID Foundation Financial-grade API
- [NIST SP 800-162 (ABAC Guide)](https://csrc.nist.gov/publications/detail/sp/800-162/final) - 属性ベースアクセス制御
- [EU AI Act](https://artificialintelligenceact.eu/) - 第14条 ヒューマンオーバーサイト義務

## 翻訳・国際化

- [DeepL API](https://developers.deepl.com/docs/getting-started/intro)
- [DeepL MCP Server Guide](https://developers.deepl.com/docs/learning-how-tos/examples-and-guides/deepl-mcp-server-how-to-build-and-use-translation-in-llm-applications)

## 自作MCPサーバー

- [RFC MCP Server](https://github.com/shuji-bonji/rfc-mcp-server)
- [xCOMET MCP Server](https://github.com/shuji-bonji/xcomet-mcp-server)
- [RxJS MCP Server](https://github.com/shuji-bonji/rxjs-mcp-server)
