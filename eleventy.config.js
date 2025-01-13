module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("style.css");
	eleventyConfig.addFilter("console", function(el) {
	console.log(el);
		return el;
	});
};