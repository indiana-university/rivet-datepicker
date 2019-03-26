const { dest, series, parallel, src, watch } = require('gulp');
const gutil = require('gulp-util');
const cp = require('child_process');
const sass = require('gulp-sass');
const rollup = require('rollup');
const rollupCommonJs = require('rollup-plugin-commonjs');
const rollupResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const browserSync = require('browser-sync').create();
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const pump = require('pump');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('autoprefixer');
const package = require('./package.json');

// Create the string for the verion number banner.
const banner = `/*! ${package.name} - @version ${package.version} */

`;

/**
 * Using Eleventy static site generator to compile Markdown docs
 * into HTML for testing/demo purposes. Uses the Nunjuck templates
 * inside './src/_includes` for layout.
 *
 * More about Eleventy here:
 * https://www.11ty.io/docs/
 *
 * More about Nunjucks here:
 * https://mozilla.github.io/nunjucks/
 */

function compileHTML(callback) {
  cp.exec('npx eleventy', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
}

function watchHTML(callback) {
  const eleventy = cp.spawn('npx', ['eleventy', '--watch']);

  const eleventyLogger = function (buffer) {
    buffer
      .toString()
      .split(/\n/)
      .forEach(message => gutil.log('Eleventy: ' + message));
  };

  eleventy.stdout.on('data', eleventyLogger);
  eleventy.stderr.on('data', eleventyLogger);

  callback();
}

function compileSass() {
  return src('src/sass/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'expanded',
        includePaths: [
          './node_modules/rivet-uits/sass/',
          './node_modules/pikaday/scss/'
        ]
      }).on('error', sass.logError)
    )
    .pipe(dest('docs/css/'));
}

/**
 * Uses Rollup to compile ES6 down to browser JS with a UMD wrapper.
 * See more here:
 * https://rollupjs.org/guide/en#gulp
 */

function compileJS() {
  return rollup
    .rollup({
      input: './src/js/' + package.name + '.js',
      plugins: [babel(), rollupCommonJs(), rollupResolve()]
    })
    .then(bundle => {
      return bundle.write({
        file: './docs/js/' + package.name + '.js',
        format: 'umd',
        name: 'RivetDatepicker',
        sourcemap: true
      });
    });
}

function copyJS() {
  return src(`./docs/js/${package.name}.js`)
    .pipe(dest('./dist/js/'));
}

function minifyJS(callback) {
  pump(
    [
      src('dist/js/' + package.name + '.js'),
      uglify(),
      rename({ suffix: '.min' }),
      dest('dist/js')
    ],
    callback
  );
}

function addJSHeader() {
  return src(`dist/js/*.js`)
    .pipe(header(banner, { package: package }))
    .pipe(dest('dist/js/'));
}

function prefixCSS() {
  return src('dist/css/' + package.name + '.css')
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
    .pipe(dest('dist/css/'));
}

function minifyCSS() {
  return src('dist/css/' + package.name + '.css')
    .pipe(cssnano())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(dest('dist/css/'));
}

function addCSSHeader() {
  return src(`dist/css/*.css`)
    .pipe(header(banner, { package: package }))
    .pipe(dest('dist/css/'));
}

function copyCSS() {
  return src('docs/css/' + package.name + '.css')
    .pipe(dest('./dist/css'));
}

function copyJS() {
  return src('docs/js/' + package.name + '.js')
    .pipe(dest('./dist/js'));
}

function serve(callback) {
  browserSync.init(
    ['docs/css/**/*.css', 'docs/js/**/*.js', 'docs/**/*.html'],
    {
      server: {
        baseDir: './docs'
      }
    }
  );

  watch('src/sass/**/*.scss', { ignoreInitial: false }, compileSass);
  watch('src/js/**/*.js', { ignoreInitial: false }, compileJS);

  callback();
}

exports.release = series(
  compileHTML,
  compileJS,
  compileSass,
  copyCSS,
  copyJS,
  prefixCSS,
  minifyCSS,
  minifyJS,
  addCSSHeader,
  addJSHeader
);

exports.default = parallel(serve, watchHTML);