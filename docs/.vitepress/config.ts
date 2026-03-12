import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import { jaConfig } from './locales/ja';
import { enConfig } from './locales/en';

export default withMermaid(
	defineConfig({
		title: 'AI Agent Architecture',
		description: 'How agents discover and orchestrate Skills, Tools, and Protocols',

		base: '/ai-agent-architecture/',

		head: [
			['link', { rel: 'icon', type: 'image/svg+xml', href: '/ai-agent-architecture/favicon.svg' }],
			// hreflang: English ↔ Japanese
			['link', { rel: 'alternate', hreflang: 'en', href: 'https://shuji-bonji.github.io/ai-agent-architecture/' }],
			['link', { rel: 'alternate', hreflang: 'ja', href: 'https://shuji-bonji.github.io/ai-agent-architecture/ja/' }],
			['link', { rel: 'alternate', hreflang: 'x-default', href: 'https://shuji-bonji.github.io/ai-agent-architecture/' }],
			// OGP defaults
			['meta', { property: 'og:type', content: 'website' }],
			['meta', { property: 'og:site_name', content: 'AI Agent Architecture' }],
			['meta', { property: 'og:locale', content: 'en' }],
			['meta', { property: 'og:locale:alternate', content: 'ja_JP' }],
			['meta', { name: 'twitter:card', content: 'summary_large_image' }],
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
		ignoreDeadLinks: false,

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
	}),
);
