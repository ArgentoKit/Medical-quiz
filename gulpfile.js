const {src, dest, watch, parallel, series} = require('gulp')
const sсss = require('gulp-sass')
//const csso = require('gulp-csso')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify-es').default
const imagemin = require('gulp-imagemin')

function browsersync() {
    browserSync.init({
        server : {
            baseDir: 'src/'
        }
    })
}

function sass() {
    return src('src/scss/**.scss')
        .pipe(sсss({outputStyle: 'conpressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserlist: ['last 2 version'],
            grid: true
        }))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream())
}

function images() {
    return src('src/img/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive:true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'src/js/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('src/js'))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['src/scss/**/*scss'], sass)
    watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts)
    watch(['src/*.html']).on('change', browserSync.reload)
}

function clear() {
    return del('dist')
}

function build() {
    return src([
        'src/css/style.min.css',
        'src/fonts/**/*',
        'src/js/main.min.js',
        'src/*.html'
    ], {base: 'src'})
        .pipe(dest('dist'))
}

exports.sass = sass;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.clear = clear;

exports.build = series(clear, images, build);
exports.default = parallel(sass, scripts, browsersync, watching)
