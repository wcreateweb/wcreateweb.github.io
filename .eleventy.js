module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/assets');

  return {
    passthroughFileCopy: true,
    templateFormats: [
			"md",
			"njk",
			"html",
			"liquid",
		],
    dir: {
      input: 'src',
      // better not use "public" as the name of the output folder (see above...)
      output: '_site',
      includes: '_includes',
      layouts: 'layouts',
      data: '_data',
    },
  };
};
