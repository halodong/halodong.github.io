
module.exports = {
  // theme: 'vdoing', // 使用npm包主题
  theme: require.resolve('./theme-fly'), // 使用本地主题

  title: "Evan's blog",
  description: 'web前端技术博客,简洁至上,专注web前端学习与总结。JavaScript,js,ES6,TypeScript,vue,python,css3,html5,Node,git,github等技术文章。',
  // base: '/', // 格式：'/<仓库名>/'， 默认'/'
  // base: '.',
  markdown: {
    lineNumbers: true, // 代码行号
  },

}