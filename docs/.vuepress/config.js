module.exports = {
    title: 'agilityForm',
    description: '一款基于Vue2开发的表单和表格渲染组件',
    base: '/agility-form-doc/',
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: `/images/icon.png`,
            },
        ],
        [
            'script',
            {
                client: 'ca-pub-9650642607350023',
                crossorigin: 'anonymous',
                src:'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
            }
        ]
    ],
    dest: 'dist/agility-form-doc',
    themeConfig: {
        // background: `/images/`,
        logo: '/images/icon.png',
        lastUpdated: 'Last Updated',
        nav: [
            {
                text: '首页',
                link: '/',
            },
            {
                text: 'GitHub',
                link: 'https://github.com/JsonLYH/agility-form.git',
            },
        ],
        sidebar: [
            {
                title: '指南',
                collapsable: false,
                children: [
                    '/',
                    './guide',
                    './globalConfig',
                    './FormType',
                    './agilitySearchForm',
                    './agilityTable'
                ],
            },
        ],
    },
    plugins: ['demo-container', 'vuepress-plugin-smooth-scroll', '@vuepress/back-to-top']
};
