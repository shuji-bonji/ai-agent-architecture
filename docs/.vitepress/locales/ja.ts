import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const jaConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: 'AI Agent Architecture',
  description: 'エージェントがSkills・Tools・Protocolsをどのように発見しオーケストレーションするか',
  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/ja/' },
      { text: 'コンセプト', link: '/ja/concepts/01-vision' },
      { text: 'MCP', link: '/ja/mcp/what-is-mcp' },
      { text: 'Skills', link: '/ja/skills/what-is-skills' },
    ],
    sidebar: {
      '/ja/': [
        {
          text: 'コンセプト',
          collapsed: false,
          items: [
            { text: 'ビジョン', link: '/ja/concepts/01-vision' },
            { text: 'リファレンスソース', link: '/ja/concepts/02-reference-sources' },
            { text: 'アーキテクチャ', link: '/ja/concepts/03-architecture' },
            { text: 'AI設計パターン', link: '/ja/concepts/04-ai-design-patterns' },
            { text: 'AI制限の克服', link: '/ja/concepts/05-solving-ai-limitations' },
          ],
        },
        {
          text: 'MCP',
          collapsed: false,
          items: [
            { text: 'MCPとは', link: '/ja/mcp/what-is-mcp' },
            { text: 'カタログ', link: '/ja/mcp/catalog' },
            { text: 'セキュリティ', link: '/ja/mcp/security' },
            { text: '開発', link: '/ja/mcp/development' },
          ],
        },
        {
          text: 'Skills',
          collapsed: false,
          items: [
            { text: 'Skillsとは', link: '/ja/skills/what-is-skills' },
            { text: 'スキル作成', link: '/ja/skills/creating-skills' },
            { text: 'アンチパターン', link: '/ja/skills/anti-patterns' },
            { text: 'MCP vs Skills', link: '/ja/skills/vs-mcp' },
          ],
        },
        {
          text: 'エージェント',
          collapsed: false,
          items: [
            { text: 'A2Aとは', link: '/ja/agents/what-is-a2a' },
            { text: 'サブエージェント', link: '/ja/agents/what-is-subagent' },
          ],
        },
        {
          text: '戦略',
          collapsed: false,
          items: [
            { text: '構成パターン', link: '/ja/strategy/composition-patterns' },
            { text: 'MCPロードマップ', link: '/ja/strategy/mcp-roadmap' },
            { text: 'Skillロードマップ', link: '/ja/strategy/skill-roadmap' },
          ],
        },
        {
          text: 'ワークフロー',
          collapsed: false,
          items: [
            { text: '開発フェーズ', link: '/ja/workflows/development-phases' },
            { text: 'パターン', link: '/ja/workflows/patterns' },
          ],
        },
        {
          text: 'その他',
          collapsed: true,
          items: [
            { text: 'ロードマップ', link: '/ja/roadmap' },
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
      pattern: 'https://github.com/shuji-bonji/ai-agent-architecture/edit/main/docs/:path',
      text: 'このページを編集',
    },
  },
}
