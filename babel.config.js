module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@helpers': './src/helpers',
          '@utils': './src/utils',
          '@middleware': './src/middleware',
          '@models': './src/db/models',
          '@api': './src/api',
          '@types': './src/types',
          '@interfaces': './src/interfaces',
          '@dbConfig': './src/db/dbConfig',
          '@constants': './src/constants',
          '@db': './src/db',
          '@swaggerDocs': './src/swaggerDocs',
          '@testData': './src/testData',
        },
      },
    ],
  ],
};
