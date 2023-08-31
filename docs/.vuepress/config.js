module.exports = {
    title: 'agilityForm',
    description: '一款基于Vue2开发的表单和表格渲染组件',
    base: '/agility-form-doc/',
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: `/favicon.ico`,
            },
        ],
    ],
    dest: 'dist/agility-form-doc',
    themeConfig: {
        // background: `/images/`,
        // logo: 'logo.png',
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
