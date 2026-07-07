import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';

export const jaConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: 'AI Agent Architecture',
  description:
    'エージェントがSkills・Tools・Protocolsをどのように発見しオーケストレーションするか',
  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/ja/' },
      { text: 'コンセプト', link: '/ja/concepts/' },
      { text: 'MCP', link: '/ja/mcp/what-is-mcp' },
      { text: 'Skills', link: '/ja/skills/what-is-skills' },
      { text: 'エージェント', link: '/ja/agents/' },
      { text: 'FAQ', link: '/ja/faq/mcp-vs-skills' },
    ],
    sidebar: {
      '/ja/': [
        {
          text: 'FAQ (3行回答)',
          collapsed: false,
          items: [
            {
              text: '本サイトのスコープ (LLM だけ?)',
              link: '/ja/faq/scope-of-ai-agent',
            },
            { text: 'MCP vs Skills', link: '/ja/faq/mcp-vs-skills' },
            {
              text: 'Agent/Sub-agent/Skill/MCP 4者比較',
              link: '/ja/faq/agent-vs-subagent-vs-skill',
            },
          ],
        },
        {
          text: 'コンセプト',
          collapsed: false,
          items: [
            { text: '全体像', link: '/ja/concepts/' },
            { text: 'ビジョン', link: '/ja/concepts/01-vision' },
            {
              text: 'リファレンスソース',
              link: '/ja/concepts/02-reference-sources',
            },
            { text: 'アーキテクチャ', link: '/ja/concepts/03-architecture' },
            {
              text: 'AI設計パターン',
              link: '/ja/concepts/04-ai-design-patterns',
            },
            {
              text: 'AI制限の克服',
              link: '/ja/concepts/05-solving-ai-limitations',
            },
            { text: 'フィジカルAI', link: '/ja/concepts/06-physical-ai' },
            {
              text: 'ドクトリンと意図',
              link: '/ja/concepts/07-doctrine-and-intent',
            },
            {
              text: '記憶と知識統合 (Memory & KG)',
              link: '/ja/concepts/08-memory-and-knowledge',
            },
            {
              text: 'プロンプト分解',
              link: '/ja/concepts/09-prompt-decomposition',
            },
          ],
        },
        {
          text: 'MCP',
          collapsed: false,
          items: [
            { text: 'MCPとは', link: '/ja/mcp/what-is-mcp' },
            { text: 'カタログ', link: '/ja/mcp/catalog' },
            { text: 'セキュリティ', link: '/ja/mcp/security' },
            { text: 'Semantic Layer', link: '/ja/mcp/semantic-layer' },
            { text: '開発', link: '/ja/mcp/development' },
          ],
        },
        {
          text: 'Skills',
          collapsed: false,
          items: [
            { text: 'Skillsとは', link: '/ja/skills/what-is-skills' },
            { text: 'Skill設計ガイド', link: '/ja/skills/creating-skills' },
            {
              text: 'スキル作成ガイド',
              link: '/ja/skills/how-to-create-skills',
            },
            {
              text: '会話からの Skill 蒸留',
              link: '/ja/skills/conversation-to-skill',
            },
            { text: 'スキル導入・利用', link: '/ja/skills/how-to-use-skills' },
            { text: '活用パターン', link: '/ja/skills/skill-use-cases' },
            { text: 'アンチパターン', link: '/ja/skills/anti-patterns' },
            { text: 'MCP vs Skills', link: '/ja/skills/vs-mcp' },
            { text: '実例ショーケース', link: '/ja/skills/showcase' },
          ],
        },
        {
          text: 'エージェント',
          collapsed: false,
          items: [
            { text: '全体像 (ランディング)', link: '/ja/agents/' },
            { text: 'エージェントの分類', link: '/ja/agents/agent-taxonomy' },
            { text: 'サブエージェント', link: '/ja/agents/what-is-subagent' },
            {
              text: 'サブエージェント vs Skills',
              link: '/ja/agents/subagent-vs-skill',
            },
            {
              text: '品質ゲートとしての活用',
              link: '/ja/agents/subagent-quality-gate',
            },
            {
              text: 'マルチエージェント / Agent Teams',
              link: '/ja/agents/agent-teams',
            },
            { text: 'A2Aとは', link: '/ja/agents/what-is-a2a' },
            { text: 'エージェントID', link: '/ja/agents/agent-identity' },
          ],
        },
        {
          text: '戦略',
          collapsed: false,
          items: [
            { text: '構成パターン', link: '/ja/strategy/composition-patterns' },
            {
              text: 'ローカル LLM 環境への 5 層モデルの写像',
              link: '/ja/strategy/local-llm-workspace-mapping',
            },
            {
              text: 'Harness Engineering との対応関係',
              link: '/ja/strategy/harness-engineering-mapping',
            },
            {
              text: 'Permission と Authority',
              link: '/ja/strategy/permission-vs-authority',
            },
            {
              text: '重み特化 vs 文脈特化',
              link: '/ja/strategy/specialization-weights-vs-context',
            },
            {
              text: 'Routing vs Cascading',
              link: '/ja/strategy/routing-vs-cascading',
            },
            {
              text: 'エージェントループのパターン',
              link: '/ja/strategy/agent-loop-patterns',
            },
            {
              text: '発見 と 生産',
              link: '/ja/strategy/discovery-vs-production',
            },
            { text: 'Loop Engineering', link: '/ja/strategy/loop-engineering' },
          ],
        },
        {
          text: 'ワークフロー',
          collapsed: false,
          items: [
            { text: '開発フェーズ', link: '/ja/workflows/development-phases' },
            { text: 'パターン概要', link: '/ja/workflows/patterns' },
            { text: '翻訳', link: '/ja/workflows/patterns/translation' },
            {
              text: '仕様参照・検証',
              link: '/ja/workflows/patterns/specification-verification',
            },
            {
              text: 'コンプライアンス',
              link: '/ja/workflows/patterns/compliance',
            },
            {
              text: '開発支援',
              link: '/ja/workflows/patterns/development-support',
            },
            {
              text: 'ドキュメント生成',
              link: '/ja/workflows/patterns/documentation-generation',
            },
            {
              text: 'マルチエージェント',
              link: '/ja/workflows/patterns/multi-agent',
            },
            {
              text: 'Issue→Deploy 自律化 (Meta + Sub-agent)',
              link: '/ja/workflows/autonomous-dev-meta-agent',
            },
          ],
        },
        {
          text: 'その他',
          collapsed: true,
          items: [
            { text: '用語集', link: '/ja/glossary' },
            { text: '成果物', link: '/ja/outputs' },
          ],
        },
      ],
    },
    outline: { label: '目次' },
    docFooter: { prev: '前へ', next: '次へ' },
    lastUpdated: { text: '最終更新' },
    editLink: {
      pattern:
        'https://github.com/shuji-bonji/ai-agent-architecture/edit/main/docs/:path',
      text: 'このページを編集',
    },
  },
};
