module.exports = {
  port: 8082,
  base: '/code-docs/',
  evergreen: true,
  locales: {
    '/zh/': {
      lang: 'zh-CN',
      title: 'Code Docs',
      description: '让你的生活变得简单'
    }
  },
  themeConfig: {
    sidebarDepth: 3,
    locales: {
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        lastUpdated: '上次编辑时间',
        sidebar: {
          '/zh/go/': [
            {
              title: '基础',
              children: [
                '/zh/go/',
                '/zh/go/installation',
                '/zh/go/convention',
                '/zh/go/variables',
                '/zh/go/functions',
                '/zh/go/flowcontrol',
                '/zh/go/moretypes',
                '/zh/go/methods',
                '/zh/go/concurrency'
              ]
            },
            {
              title: '应用',
              children: [
                '/zh/go/application/database',
                '/zh/go/application/file',
                '/zh/go/application/json',
                '/zh/go/application/datetime',
              ]
            }
          ],
          '/zh/python/': [
            {
              title: '基础',
              children: [
                '/zh/python/',
                '/zh/python/installation',
                '/zh/python/convention',
                '/zh/python/variables',
                '/zh/python/functions',
                '/zh/python/flowcontrol',
                '/zh/python/modules',
                '/zh/python/class',
                '/zh/python/concurrency'
              ]
            },
            {
              title: '应用',
              children: [
                '/zh/python/application/database',
                '/zh/python/application/file',
                '/zh/python/application/json',
                '/zh/python/application/datetime',
              ]
            }
          ],
          '/zh/php/': [{
              title: '基础',
              children: [
                '/zh/php/',
                '/zh/php/installation',
                '/zh/php/convention',
                '/zh/php/variables',
                '/zh/php/functions',
                '/zh/php/flowcontrol',
                '/zh/php/moretypes',
                '/zh/php/class',
              ]
            },
            {
              title: '应用',
              children: [
                '/zh/php/application/database',
                '/zh/php/application/file',
                '/zh/php/application/json',
                '/zh/php/application/datetime'
              ]
            }
          ],
          '/zh/tools/': [
            '/zh/tools/proxy',
          ],
          '/zh/others/': [
            '/zh/mysql'
          ]
        }
      }
    }
  }
}