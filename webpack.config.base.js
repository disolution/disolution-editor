import path from 'path';

export default {
  module: {
    loaders: [{
      test: /\.node$/,
      loaders: ['node-loader']
    }, {
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [

  ],
  externals: [
    {
      nodegit: 'commonjs nodegit',
      lowdb: 'commonjs lowdb',
      localForage: 'commonjs localForage'
    }
  ]
};
