import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { jaConfig } from './locales/ja'
import { enConfig } from './locales/en'

export default withMermaid(
  defineConfig({
    title: 'AI Agent Architecture',
    description: 'How agents discover and orchestrate Skills, Tools, and Protocols',

    base: '/ai-agent-architecture/',

    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/ai-agent-architecture/favicon.svg' }],
    ],

    // i18n: English = root, Japanese = /ja/
    locales: {
      root: {
        label: 'English',
        lang: 'en',
        ...enConfig,
      },
      ja: {
        label: '日本語 (Japanese)',
        lang: 'ja',
        link: '/ja/',
        ...jaConfig,
      },
    },

    // Mermaid
    mermaid: {
      securityLevel: 'loose',
      theme: 'default',
      flowchart: { useMaxWidth: true },
      sequence: { useMaxWidth: true },
      mindmap: { useMaxWidth: true },
      timeline: { useMaxWidth: true },
    },
    mermaidPlugin: {
      class: 'mermaid',
    },

    // Vite 最適化
    vite: {
      optimizeDeps: {
        include: ['mermaid'],
      },
      build: {
        emptyOutDir: true,
      },
    },

    // tempDir をローカルに（マウント先の権限問題回避）
    tempDir: '/tmp/vitepress-temp',

    // .ja.md ファイルを除外（VitePress用にリネーム済み）
    srcExclude: ['**/*.ja.md', '**/translation-quality-report*', 'en/**'],

    // Sitemap（自動生成 + lastUpdated の日付を <lastmod> に反映）
    sitemap: {
      hostname: 'https://shuji-bonji.github.io/ai-agent-architecture/',
    },

    // テーマ共通設定
    lastUpdated: true,
    cleanUrls: true,
    ignoreDeadLinks: true,   // TODO: リンク修正後に false に戻す

    themeConfig: {
      socialLinks: [
        { icon: 'github', link: 'https://github.com/shuji-bonji/ai-agent-architecture' },
      ],
      search: {
        provider: 'local',
      },
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2025-2026 shuji-bonji',
      },
    },
  })
)
