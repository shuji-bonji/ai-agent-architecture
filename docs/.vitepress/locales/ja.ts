import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress';

export const jaConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: 'LLMエージェントの設計',
  description:
    '基盤モデルを推論の中核とするエージェントの設計',
  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/ja/' },
      { text: '序章', link: '/ja/preface' },
      { text: 'MCP', link: '/ja/mcp/what-is-mcp' },
      { text: 'Skills', link: '/ja/skills/what-is-skills' },
      { text: 'エージェント', link: '/ja/agents/' },
      { text: 'FAQ', link: '/ja/faq/mcp-vs-skills' },
    ],
    sidebar: {
      '/ja/': [
        {
          text: '序章',
          collapsed: false,
          items: [
            { text: '本書の問いと範囲', link: '/ja/preface' },
          ],
        },
        {
          text: '第I部 前提',
          collapsed: false,
          items: [
            { text: '制約の要約', link: '/ja/part-1/constraints' },
          ],
        },
        {
          text: '第II部 モデル',
          collapsed: false,
          items: [
            { text: '五層', link: '/ja/part-2/layers' },
            { text: '配置基準', link: '/ja/part-2/placement' },
          ],
        },
        {
          text: '第III部 各層',
          collapsed: false,
          items: [
            { text: 'Skills', link: '/ja/skills/what-is-skills' },
            {
              text: 'Skills の手順・実例',
              collapsed: true,
              items: [
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
            { text: 'MCP', link: '/ja/mcp/what-is-mcp' },
            {
              text: 'MCP の手順・カタログ',
              collapsed: true,
              items: [
                { text: 'カタログ', link: '/ja/mcp/catalog' },
                { text: 'セキュリティ', link: '/ja/mcp/security' },
                { text: 'Semantic Layer', link: '/ja/mcp/semantic-layer' },
                { text: '開発', link: '/ja/mcp/development' },
                { text: 'Verifiable MCP', link: '/ja/mcp/verifiable-mcp' },
              ],
            },
            { text: 'Doctrine', link: '/ja/part-3/doctrine' },
            { text: 'Memory', link: '/ja/part-3/memory' },
            { text: 'Agent', link: '/ja/agents/' },
            {
              text: 'Agent の各論',
              collapsed: true,
              items: [
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
          ],
        },
        {
          text: '第IV部 構成と展開',
          collapsed: false,
          items: [
            { text: 'パターン', link: '/ja/part-4/patterns' },
            { text: '限界', link: '/ja/part-4/limits' },
            { text: '物理世界', link: '/ja/part-4/physical' },
            { text: 'プロンプトの分解', link: '/ja/part-4/prompt-decomposition' },
            {
              text: '戦略・展開',
              collapsed: true,
              items: [
                { text: '構成パターン', link: '/ja/strategy/composition-patterns' },
                { text: 'MCP Family', link: '/ja/strategy/mcp-family' },
                {
                  text: '判定の決定論性',
                  link: '/ja/strategy/deterministic-verdicts',
                },
                {
                  text: 'ローカル LLM 環境への 5 層モデルの写像',
                  link: '/ja/strategy/local-llm-workspace-mapping',
                },
                {
                  text: 'Harness Engineering との対応関係',
                  link: '/ja/strategy/harness-engineering-mapping',
                },
                {
                  text: 'Hooks（実行時フック）',
                  link: '/ja/strategy/hooks',
                },
                {
                  text: '提案と拘束',
                  link: '/ja/strategy/proposal-and-binding',
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
          ],
        },
        {
          text: '付録',
          collapsed: false,
          items: [
            {
              text: 'FAQ (3行回答)',
              collapsed: true,
              items: [
                {
                  text: '範囲（序章へ）',
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
              text: '情報基盤',
              collapsed: true,
              items: [
                { text: '概要', link: '/ja/information/' },
                { text: '全体地図', link: '/ja/information/architecture-map' },
              ],
            },
            {
              text: 'ワークフロー',
              collapsed: true,
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
            { text: '用語集', link: '/ja/glossary' },
            { text: '成果物', link: '/ja/outputs' },
          ],
        },
        {
          text: '旧パス（Concepts）',
          collapsed: true,
          items: [
            { text: '全体像', link: '/ja/concepts/' },
            { text: 'ビジョン（→ 制約の要約）', link: '/ja/concepts/01-vision' },
            {
              text: 'リファレンスソース（→ 配置基準）',
              link: '/ja/concepts/02-reference-sources',
            },
            { text: 'アーキテクチャ（→ 五層）', link: '/ja/concepts/03-architecture' },
            {
              text: 'AI設計パターン（→ パターン）',
              link: '/ja/concepts/04-ai-design-patterns',
            },
            {
              text: 'AI制限の克服（→ 限界）',
              link: '/ja/concepts/05-solving-ai-limitations',
            },
            { text: 'フィジカルAI（→ 物理世界）', link: '/ja/concepts/06-physical-ai' },
            {
              text: 'ドクトリンと意図（→ Doctrine）',
              link: '/ja/concepts/07-doctrine-and-intent',
            },
            {
              text: '記憶と知識統合（→ Memory）',
              link: '/ja/concepts/08-memory-and-knowledge',
            },
            {
              text: 'プロンプト分解（→ プロンプトの分解）',
              link: '/ja/concepts/09-prompt-decomposition',
            },
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
