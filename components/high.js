var hljs = require('highlight.js/lib/core');
hljs.registerLanguage('rust', require('highlight.js/lib/languages/rust'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
module.exports = hljs;

