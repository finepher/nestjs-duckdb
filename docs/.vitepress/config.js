import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'NestJs DuckDB',
  description: 'Simple, friendly DuckDB integration for NestJS',
  base: '/nestjs-duckdb/',

  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Blog', link: 'https://finepher.com/en/blogs/we-created-nestjs-duckdb-a-simple-duckdb-integration-for-nestjs', target: '_blank' },
      { text: 'GitHub', link: 'https://github.com/finepher/nestjs-duckdb' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Async Configuration', link: '/guide/async-configuration' },
          { text: 'API Reference', link: '/guide/api-reference' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/finepher/nestjs-duckdb' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright (c) 2026. Developed by the engineers at <a href="https://finepher.com/" target="_blank" rel="noreferrer">Finepher</a>',
    },

    search: {
      provider: 'local',
    },
  },
});
