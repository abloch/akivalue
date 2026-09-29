const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

function youtubeId(url) {
	if (!url) return "";
	const str = String(url).trim();
	// Bare ID (no scheme, slashes or query)
	if (!/[/?:.&]/.test(str)) return str;
	let m;
	// youtu.be/<id>
	if ((m = str.match(/youtu\.be\/([^?&#/]+)/))) return m[1];
	// youtube.com/watch?v=<id>
	if ((m = str.match(/[?&]v=([^?&#]+)/))) return m[1];
	// youtube.com/embed/<id>
	if ((m = str.match(/embed\/([^?&#/]+)/))) return m[1];
	// /shorts/<id>
	if ((m = str.match(/shorts\/([^?&#/]+)/))) return m[1];
	return str;
}

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("js");
	eleventyConfig.addFilter("console", function(el) {
	console.log(el);
		return el;
	});
	eleventyConfig.addShortcode("youtube", function (urlOrId) {
		const id = youtubeId(urlOrId);
		return `<div class="youtube-embed"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
	});
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "posts", // iterate over `collections.posts`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "he",
			title: "Akivalue",
			subtitle: "המחשבות של עקיבא",
			base: "https://blog.akivalue.omg.lol",
			author: {
				name: "akiva",
				email: "akivalue@omg.lol", // Optional
			}
		}
	});
};