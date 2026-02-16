import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: 'AI Agent Toolkit',
  description: 'MCP alone is not enough — How agents discover and orchestrate Skills and Tools',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Concepts', link: '/concepts/01-vision' },
      { text: 'MCP', link: '/mcp/what-is-mcp' },
      { text: 'Skills', link: '/skills/what-is-skills' },
    ],
    sidebar: {
      '/': [
        {
          text: 'Concepts',
          collapsed: false,
          items: [
            { text: 'Vision', link: '/concepts/01-vision' },
            { text: 'Reference Sources', link: '/concepts/02-reference-sources' },
            { text: 'Architecture', link: '/concepts/03-architecture' },
            { text: 'AI Design Patterns', link: '/concepts/04-ai-design-patterns' },
            { text: 'Solving AI Limitations', link: '/concepts/05-solving-ai-limitations' },
          ],
        },
        {
          text: 'MCP',
          collapsed: false,
          items: [
            { text: 'What is MCP', link: '/mcp/what-is-mcp' },
            { text: 'Catalog', link: '/mcp/catalog' },
            { text: 'Security', link: '/mcp/security' },
            { text: 'Development', link: '/mcp/development' },
          ],
        },
        {
          text: 'Skills',
          collapsed: false,
          items: [
            { text: 'What is Skills', link: '/skills/what-is-skills' },
            { text: 'Creating Skills', link: '/skills/creating-skills' },
            { text: 'Anti-patterns', link: '/skills/anti-patterns' },
            { text: 'MCP vs Skills', link: '/skills/vs-mcp' },
          ],
        },
        {
          text: 'Agents',
          collapsed: false,
          items: [
            { text: 'What is A2A', link: '/agents/what-is-a2a' },
            { text: 'Sub-agents', link: '/agents/what-is-subagent' },
          ],
        },
        {
          text: 'Strategy',
          collapsed: false,
          items: [
            { text: 'Composition Patterns', link: '/strategy/composition-patterns' },
            { text: 'MCP Roadmap', link: '/strategy/mcp-roadmap' },
            { text: 'Skill Roadmap', link: '/strategy/skill-roadmap' },
          ],
        },
        {
          text: 'Workflows',
          collapsed: false,
          items: [
            { text: 'Development Phases', link: '/workflows/development-phases' },
            { text: 'Patterns', link: '/workflows/patterns' },
          ],
        },
        {
          text: 'Other',
          collapsed: true,
          items: [
            { text: 'Roadmap', link: '/roadmap' },
            { text: 'Glossary', link: '/glossary' },
            { text: 'Outputs', link: '/outputs' },
          ],
        },
      ],
    },
    editLink: {
      pattern: 'https://github.com/shuji-bonji/ai-agent-toolkit/edit/main/docs/:path',
      text: 'Edit this page',
    },
  },
}
