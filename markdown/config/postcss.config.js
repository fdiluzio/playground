module.exports = {
  plugins: [
    /**
     * Docs: https://github.com/csstools/postcss-preset-env
     */
    require('postcss-preset-env')({
      // Enabled Stage 2 features and add polyfill if necessary
      stage: 2,
      /**
       * Enabled this list of features no matter what stage are
       * You can see the list of all features id below:
       * https://github.com/csstools/postcss-preset-env/blob/master/src/lib/plugins-by-id.js#L36
       */
      features: {
        'nesting-rules': true,
        // Enbaled prefers-color-scheme features
        // To detect dark/light mode
        'prefers-color-scheme-query': true,
      },
      // This will get passed to autoprefixer
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace',
      },
    }),
  ],
};