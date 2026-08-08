import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: 'AI Agent Architecture',
  description: 'How agents discover and orchestrate Skills, Tools, and Protocols',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Concepts', link: '/concepts/' },
      { text: 'MCP', link: '/mcp/what-is-mcp' },
      { text: 'Skills', link: '/skills/what-is-skills' },
      { text: 'Agents', link: '/agents/' },
      { text: 'FAQ', link: '/faq/mcp-vs-skills' },
    ],
    sidebar: {
      '/': [
        {
          text: 'FAQ (3-line answers)',
          collapsed: false,
          items: [
            { text: 'Scope of this site (only LLMs?)', link: '/faq/scope-of-ai-agent' },
            { text: 'MCP vs Skills', link: '/faq/mcp-vs-skills' },
            { text: 'Agent/Sub-agent/Skill/MCP comparison', link: '/faq/agent-vs-subagent-vs-skill' },
          ],
        },
        {
          text: 'Concepts',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/concepts/' },
            { text: 'Vision', link: '/concepts/01-vision' },
            { text: 'Reference Sources', link: '/concepts/02-reference-sources' },
            { text: 'Architecture', link: '/concepts/03-architecture' },
            { text: 'AI Design Patterns', link: '/concepts/04-ai-design-patterns' },
            { text: 'Solving AI Limitations', link: '/concepts/05-solving-ai-limitations' },
            { text: 'Physical AI', link: '/concepts/06-physical-ai' },
            { text: 'Doctrine & Intent', link: '/concepts/07-doctrine-and-intent' },
            { text: 'Memory & Knowledge (KG)', link: '/concepts/08-memory-and-knowledge' },
            { text: 'Prompt Decomposition', link: '/concepts/09-prompt-decomposition' },
          ],
        },
        {
          text: 'Information',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/information/' },
            { text: 'Architecture Map', link: '/information/architecture-map' },
          ],
        },
        {
          text: 'MCP',
          collapsed: false,
          items: [
            { text: 'What is MCP', link: '/mcp/what-is-mcp' },
            { text: 'Catalog', link: '/mcp/catalog' },
            { text: 'Security', link: '/mcp/security' },
            { text: 'Semantic Layer', link: '/mcp/semantic-layer' },
            { text: 'Development', link: '/mcp/development' },
          ],
        },
        {
          text: 'Skills',
          collapsed: false,
          items: [
            { text: 'What is Skills', link: '/skills/what-is-skills' },
            { text: 'Skill Design Guide', link: '/skills/creating-skills' },
            { text: 'How to Create Skills', link: '/skills/how-to-create-skills' },
            { text: 'Distilling Skills from Conversations', link: '/skills/conversation-to-skill' },
            { text: 'How to Use Skills', link: '/skills/how-to-use-skills' },
            { text: 'Skill Use Cases', link: '/skills/skill-use-cases' },
            { text: 'Anti-patterns', link: '/skills/anti-patterns' },
            { text: 'MCP vs Skills', link: '/skills/vs-mcp' },
            { text: 'Showcase', link: '/skills/showcase' },
          ],
        },
        {
          text: 'Agents',
          collapsed: false,
          items: [
            { text: 'Overview (landing)', link: '/agents/' },
            { text: 'Agent Taxonomy', link: '/agents/agent-taxonomy' },
            { text: 'Sub-agents', link: '/agents/what-is-subagent' },
            { text: 'Sub-agent vs Skills', link: '/agents/subagent-vs-skill' },
            { text: 'Quality Gate Pattern', link: '/agents/subagent-quality-gate' },
            { text: 'Multi-Agent / Agent Teams', link: '/agents/agent-teams' },
            { text: 'What is A2A', link: '/agents/what-is-a2a' },
            { text: 'Agent Identity', link: '/agents/agent-identity' },
          ],
        },
        {
          text: 'Strategy',
          collapsed: false,
          items: [
            { text: 'Composition Patterns', link: '/strategy/composition-patterns' },
            { text: 'MCP Family', link: '/strategy/mcp-family' },
            { text: 'Deterministic Verdicts', link: '/strategy/deterministic-verdicts' },
            { text: 'Local LLM Workspace Mapping', link: '/strategy/local-llm-workspace-mapping' },
            { text: 'Harness Engineering Mapping', link: '/strategy/harness-engineering-mapping' },
            { text: 'Permission vs. Authority', link: '/strategy/permission-vs-authority' },
            { text: 'Weight vs. Context Specialization', link: '/strategy/specialization-weights-vs-context' },
            { text: 'Routing vs. Cascading', link: '/strategy/routing-vs-cascading' },
            { text: 'Agent Loop Patterns', link: '/strategy/agent-loop-patterns' },
            { text: 'Discovery vs. Production', link: '/strategy/discovery-vs-production' },
            { text: 'Loop Engineering', link: '/strategy/loop-engineering' },
          ],
        },
        {
          text: 'Workflows',
          collapsed: false,
          items: [
            { text: 'Development Phases', link: '/workflows/development-phases' },
            { text: 'Patterns Overview', link: '/workflows/patterns' },
            { text: 'Translation', link: '/workflows/patterns/translation' },
            { text: 'Spec Verification', link: '/workflows/patterns/specification-verification' },
            { text: 'Compliance', link: '/workflows/patterns/compliance' },
            { text: 'Dev Support', link: '/workflows/patterns/development-support' },
            { text: 'Doc Generation', link: '/workflows/patterns/documentation-generation' },
            { text: 'Multi-Agent', link: '/workflows/patterns/multi-agent' },
            { text: 'Issue→Deploy Autonomy (Meta + Sub-agent)', link: '/workflows/autonomous-dev-meta-agent' },
          ],
        },
        {
          text: 'Other',
          collapsed: true,
          items: [
            { text: 'Glossary', link: '/glossary' },
            { text: 'Outputs', link: '/outputs' },
          ],
        },
      ],
    },
    editLink: {
      pattern: 'https://github.com/shuji-bonji/ai-agent-architecture/edit/main/docs/:path',
      text: 'Edit this page',
    },
  },
}
