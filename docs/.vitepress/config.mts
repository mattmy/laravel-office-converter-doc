import { defineConfig } from 'vitepress'

const repositoryUrl = 'https://github.com/mattmy/laravel-office-converter'
const pages = [
  ['Getting started', 'getting-started'],
  ['Choosing an input', 'inputs'],
  ['Supported conversions', 'supported-conversions'],
  ['Retrieving and storing output', 'outputs'],
  ['Configuration', 'configuration'],
  ['Errors and troubleshooting', 'errors-and-troubleshooting'],
  ['Performance and security', 'performance-and-security'],
  ['API reference', 'api-reference'],
]
const pagesZh = [
  ['開始使用', 'getting-started'],
  ['選擇輸入方式', 'inputs'],
  ['支援的轉換', 'supported-conversions'],
  ['取得與儲存輸出', 'outputs'],
  ['設定參考', 'configuration'],
  ['錯誤與疑難排解', 'errors-and-troubleshooting'],
  ['效能與安全', 'performance-and-security'],
  ['API 參考', 'api-reference'],
]

export default defineConfig({
  title: 'Laravel Office Converter',
  description: 'Convert office documents with LibreOffice in Laravel',
  base: '/laravel-office-converter-doc/',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: { hostname: 'https://mattmy.github.io/laravel-office-converter-doc/' },
  locales: {
    root: {
      label: 'English', lang: 'en', title: 'Laravel Office Converter',
      description: 'Convert office documents with LibreOffice in Laravel',
      themeConfig: {
        nav: [{ text: 'Home', link: '/' }, { text: 'Documentation', link: '/guide/getting-started' }, { text: 'GitHub', link: repositoryUrl }],
        sidebar: { '/guide/': [{ text: 'Documentation', items: pages.map(([text, slug]) => ({ text, link: `/guide/${slug}` })) }] },
        outline: { level: [2, 3], label: 'On this page' },
        docFooter: { prev: false, next: false },
        footer: { message: 'Released under the MIT License.', copyright: 'Copyright © mattmy' },
      },
    },
    'zh-TW': {
      label: '繁體中文', lang: 'zh-TW', link: '/zh-TW/', title: 'Laravel Office Converter',
      description: '在 Laravel 使用 LibreOffice 轉換辦公文件',
      themeConfig: {
        nav: [{ text: '首頁', link: '/zh-TW/' }, { text: '文件', link: '/zh-TW/guide/getting-started' }, { text: 'GitHub', link: repositoryUrl }],
        sidebar: { '/zh-TW/guide/': [{ text: '文件', items: pagesZh.map(([text, slug]) => ({ text, link: `/zh-TW/guide/${slug}` })) }] },
        outline: { level: [2, 3], label: '本頁內容' },
        docFooter: { prev: false, next: false },
        footer: { message: '使用 MIT License 發布。', copyright: 'Copyright © mattmy' },
      },
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: repositoryUrl }],
  },
})
