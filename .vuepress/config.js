module.exports = {
  base: '',
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
    ]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      {
        text: '主页',
        link: '/',
        icon: 'reco-home'
      },
      {
        text: '时间线',
        link: '/timeline/',
        icon: 'reco-date'
      },
      {
        text: '文档',
        icon: 'reco-message',
        items: [
          {
            text: '浏览器原理',
            link: '/docs/Browser/'
          }
        ]
      },
      {
        text: '更多',
        icon: 'reco-message',
        items: [
          {
            text: 'GitHub',
            link: 'https://github.com/corzero',
            icon: 'reco-github'
          }
        ]
      }
    ],
    sidebar: {
      '/docs/Browser/': ['', '1.架构', '2.tcp-ip协议','3.http请求流程','4.输入URL','5.渲染流程']
    },
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
    lastUpdated: 'Last Updated',
    author: 'Dawn',
    authorAvatar: '/avatar.png',
    // record: 'xxxxx',
    startYear: '2018'
  },
  markdown: {
    lineNumbers: true
  }
}
