module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './', // Définit `@` pour pointer vers la racine du projet
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // Extensions prises en charge
        },
      ],
    ],
  };
};
