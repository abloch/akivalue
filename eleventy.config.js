const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("js");
	eleventyConfig.addFilter("console", function(el) {
	console.log(el);
		return el;
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