import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index';

const DEFAULTS = {
	plugins: [],
	init: () => {}
};

function loadPrismPlugin(name) {
	try {
		require(`prismjs/plugins/${name}/prism-${name}`);
	} catch (e) {
		throw new Error(`Cannot load Prism plugin "${name}". Please check the spelling.`);
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
	const prismLang = loadLanguages([lang]);
	const code = prismLang ? Prism.highlight(text, prismLang).split('\n').join('<br />') : markdownit.utils.escapeHtml(text);
	const classAttribute = lang ? ` class="${markdownit.options.langPrefix}${lang}"` : '';

	return `<pre${classAttribute}><code${classAttribute}>${code}</code></pre>`;
}

function markdownItPrism(markdownit, useroptions) {
	const options = Object.assign({}, DEFAULTS, useroptions);

	options.plugins.forEach(loadPrismPlugin);
	options.init(Prism);

	// register ourselves as highlighter
	markdownit.options.highlight = (...args) => highlight(markdownit, ...args);
}

export default markdownItPrism;
