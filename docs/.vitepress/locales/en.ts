import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: 'LLM Agent Design Architecture',
  description: 'Design of agents whose inference core is a foundation model',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Preface', link: '/preface' },
      { text: 'MCP', link: '/mcp/what-is-mcp' },
      { text: 'Skills', link: '/skills/what-is-skills' },
      { text: 'Agents', link: '/agents/' },
      { text: 'FAQ', link: '/faq/mcp-vs-skills' },
    ],
    sidebar: {
      '/': [
        {
          text: 'Preface',
          collapsed: false,
          items: [
            { text: 'Questions and scope', link: '/preface' },
          ],
        },
        {
          text: 'Part I',
          collapsed: false,
          items: [
            { text: 'Constraint summary', link: '/part-1/constraints' },
          ],
        },
        {
          text: 'Part II',
          collapsed: false,
          items: [
            { text: 'Five layers', link: '/part-2/layers' },
            { text: 'Placement', link: '/part-2/placement' },
          ],
        },
        {
          text: 'Part III',
          collapsed: false,
          items: [
            { text: 'Skills', link: '/skills/what-is-skills' },
            {
              text: 'Skills procedures and examples',
              collapsed: true,
              items: [
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
            { text: 'MCP', link: '/mcp/what-is-mcp' },
            {
              text: 'MCP procedures and catalogue',
              collapsed: true,
              items: [
                { text: 'Catalog', link: '/mcp/catalog' },
                { text: 'Security', link: '/mcp/security' },
                { text: 'Semantic Layer', link: '/mcp/semantic-layer' },
                { text: 'Development', link: '/mcp/development' },
              ],
            },
            { text: 'Doctrine', link: '/part-3/doctrine' },
            { text: 'Memory', link: '/part-3/memory' },
            { text: 'Agent', link: '/agents/' },
            {
              text: 'Agent topics',
              collapsed: true,
              items: [
                { text: 'Agent Taxonomy', link: '/agents/agent-taxonomy' },
                { text: 'Sub-agents', link: '/agents/what-is-subagent' },
                { text: 'Sub-agent vs Skills', link: '/agents/subagent-vs-skill' },
                { text: 'Quality Gate Pattern', link: '/agents/subagent-quality-gate' },
                { text: 'Multi-Agent / Agent Teams', link: '/agents/agent-teams' },
                { text: 'What is A2A', link: '/agents/what-is-a2a' },
                { text: 'Agent Identity', link: '/agents/agent-identity' },
              ],
            },
          ],
        },
        {
          text: 'Part IV',
          collapsed: false,
          items: [
            { text: 'Patterns', link: '/part-4/patterns' },
            { text: 'Limits', link: '/part-4/limits' },
            { text: 'Physical world', link: '/part-4/physical' },
            { text: 'Prompt decomposition', link: '/part-4/prompt-decomposition' },
            {
              text: 'Strategy and rollout',
              collapsed: true,
              items: [
                { text: 'Composition Patterns', link: '/strategy/composition-patterns' },
                { text: 'MCP Family', link: '/strategy/mcp-family' },
                { text: 'Deterministic Verdicts', link: '/strategy/deterministic-verdicts' },
                { text: 'Local LLM Workspace Mapping', link: '/strategy/local-llm-workspace-mapping' },
                { text: 'Harness Engineering Mapping', link: '/strategy/harness-engineering-mapping' },
                { text: 'Hooks', link: '/strategy/hooks' },
                { text: 'Proposal vs. Binding', link: '/strategy/proposal-and-binding' },
                { text: 'Permission vs. Authority', link: '/strategy/permission-vs-authority' },
                { text: 'Weight vs. Context Specialization', link: '/strategy/specialization-weights-vs-context' },
                { text: 'Routing vs. Cascading', link: '/strategy/routing-vs-cascading' },
                { text: 'Agent Loop Patterns', link: '/strategy/agent-loop-patterns' },
                { text: 'Discovery vs. Production', link: '/strategy/discovery-vs-production' },
                { text: 'Loop Engineering', link: '/strategy/loop-engineering' },
              ],
            },
          ],
        },
        {
          text: 'Appendix',
          collapsed: false,
          items: [
            {
              text: 'FAQ (3-line answers)',
              collapsed: true,
              items: [
                { text: 'Scope (see Preface)', link: '/faq/scope-of-ai-agent' },
                { text: 'MCP vs Skills', link: '/faq/mcp-vs-skills' },
                { text: 'Agent/Sub-agent/Skill/MCP comparison', link: '/faq/agent-vs-subagent-vs-skill' },
              ],
            },
            {
              text: 'Information',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/information/' },
                { text: 'Architecture Map', link: '/information/architecture-map' },
              ],
            },
            {
              text: 'Workflows',
              collapsed: true,
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
            { text: 'Glossary', link: '/glossary' },
            { text: 'Outputs', link: '/outputs' },
          ],
        },
        {
          text: 'Old paths (Concepts)',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/concepts/' },
            { text: 'Vision (→ Constraint Summary)', link: '/concepts/01-vision' },
            { text: 'Reference Sources (→ Placement)', link: '/concepts/02-reference-sources' },
            { text: 'Architecture (→ Five Layers)', link: '/concepts/03-architecture' },
            { text: 'AI Design Patterns (→ Patterns)', link: '/concepts/04-ai-design-patterns' },
            { text: 'Solving AI Limitations (→ Limits)', link: '/concepts/05-solving-ai-limitations' },
            { text: 'Physical AI (→ Physical world)', link: '/concepts/06-physical-ai' },
            { text: 'Doctrine & Intent (→ Doctrine)', link: '/concepts/07-doctrine-and-intent' },
            { text: 'Memory & Knowledge (→ Memory)', link: '/concepts/08-memory-and-knowledge' },
            { text: 'Prompt Decomposition (→ Prompt decomposition)', link: '/concepts/09-prompt-decomposition' },
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
