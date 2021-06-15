const docMenu = require('./docConfig')
const navConfig = require('./navConfig')

module.exports = {
  base: '',
  lang: 'zh-CN',
  title: '阿晨同学',
  description: "Don't waste life in doubts and fears. （ Emerson ）",
  dest: 'public',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      }
    ],
    ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.4.1/jquery.min.js' }],
        ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js' }],
        ['link', { rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css' }]
  ],
  theme: 'reco',
  themeConfig: {
    nav: navConfig,
    sidebar: docMenu,
    type: 'blog',
    blogConfig: {
      category: {
        location: 2,
        text: '分类'
      },
      tag: {
        location: 3,
        text: '标签'
      }
    },
    friendLink: [
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        avatar:
          'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
        link: 'https://vuepress-theme-reco.recoluan.com'
      }
    ],
    logo: '/logo.png',
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    subSidebar: 'auto',
    sidebarDepth: 1,
    displayAllHeaders: false,
    // 更新字段
    lastUpdated: 'Last Updated',
    author: 'Dawn',
    authorAvatar: '/avatar.png',
    // record: 'xxxxx',
    startYear: '2019'
  },
  markdown: {
    lineNumbers: true
  },
}
