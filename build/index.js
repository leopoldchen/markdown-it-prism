'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _prismjs = require('prismjs');

var _prismjs2 = _interopRequireDefault(_prismjs);

var _index = require('prismjs/components/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULTS = {
	plugins: [],
	init: function init() {}
};

function loadPrismPlugin(name) {
	try {
		require('prismjs/plugins/' + name + '/prism-' + name);
	} catch (e) {
		throw new Error('Cannot load Prism plugin "' + name + '". Please check the spelling.');
	}
}

/**
 * Highlights the provided text using Prism.
 *
 * @param <MarkdownIt> markdownit
 * 		Instance of MarkdownIt Class. This argument is bound in markdownItPrism().
 * @param <String> text
 * 		The text to highlight.
 * @param <String> lang
 *		Code of the language to highlight the text in.
 * @return <String> <code>text</code> wrapped in <code>&lt;pre&gt;</code> and <code>&lt;code&gt;</code>, both equipped with the appropriate class (markdown-it’s langPrefix + lang). If Prism knows <code>lang</code>, <code>text</code> will be highlighted by it.
 */
function highlight(markdownit, text, lang) {
	var prismLang = (0, _index2.default)([lang]);
	var code = prismLang ? _prismjs2.default.highlight(text, prismLang).split('\n').join('<br />') : markdownit.utils.escapeHtml(text);
	var classAttribute = lang ? ' class="' + markdownit.options.langPrefix + lang + '"' : '';

	return '<pre' + classAttribute + '><code' + classAttribute + '>' + code + '</code></pre>';
}

function markdownItPrism(markdownit, useroptions) {
	var options = Object.assign({}, DEFAULTS, useroptions);

	options.plugins.forEach(loadPrismPlugin);
	options.init(_prismjs2.default);

	// register ourselves as highlighter
	markdownit.options.highlight = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return highlight.apply(undefined, [markdownit].concat(args));
	};
}

exports.default = markdownItPrism;
module.exports = exports['default'];