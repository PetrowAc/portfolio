// 1. install nvm
// 2. install node 12.4.* or newer
// 3. npm install -g gulp-cli
// 4. npm install --save gulp gulp-size gulp-imagemin gulp-sass gulp-postcss gulp-sourcemaps autoprefixer cssnano postcss-size postcss-color-function postcss-position critical gulp-concat gulp-uglify gulp-babel @babel/core @babel/preset-env @babel/plugin-transform-modules-umd gulp-svg-sprite node-bourbon gulp-rename imagemin-webp gulp-ext-replace
// 5. npm install --save-dev browser-sync gulp-connect-php gulp-plumber gulp-eslint

(() => {
    'use strict';

    // fetch command line arguments
    const arg = (argList => {
        let arg = {},
            a,
            opt,
            thisOpt,
            curOpt;
        for (a = 0; a < argList.length; a++) {
            thisOpt = argList[a].trim();
            opt = thisOpt.replace(/^\-+/, '');

            if (opt === thisOpt) {
                // argument value
                if (curOpt) arg[curOpt] = opt;
                curOpt = null;
            } else {
                // argument name
                curOpt = opt;
                arg[curOpt] = true;
            }
        }

        return arg;
    })(process.argv);

    // load modules
    const gulp = require('gulp');
    const plumber = require('gulp-plumber');
    const sass = require('gulp-sass');
    const postcss = require('gulp-postcss');
    const size = require('gulp-size');
    const imagemin = require('gulp-imagemin');
    const svgSprite = require('gulp-svg-sprite');
    const webp = require('imagemin-webp');
    const extReplace = require('gulp-ext-replace');
    const eslint = require("gulp-eslint");
    const concat = require('gulp-concat');
    const uglify = require('gulp-uglify');
    const rename = require('gulp-rename');
    const babel = require('gulp-babel');
    const include = require('gulp-include');
    const sourcemaps = require('gulp-sourcemaps');
    const browsersync = require('browser-sync').create();
    const connect = require('gulp-connect-php');
    const critical = require('critical');
    const fs = require('fs');

    // Compile CSS. Run through SASS and postCSS
    const cssConfig = {
        taskSrc: 'src/sass/*.scss',
        //foldersSrc: ['src/sass/components/*.scss', 'src/sass/includes/*.scss'],
        build: './css/',
        sassOpts: {
            sourceMap: true,
            // imagePath: '/images/',
            precision: 3,
            errLogToConsole: true,
            includePaths: [require('node-bourbon').includePaths],
        },

        postCSS: [
            require('postcss-size'),
            require('postcss-color-function'),
            require('postcss-position'),
            require('autoprefixer')(),
            require('cssnano'),
        ],
    };

    function css() {
        return gulp
            .src(cssConfig.taskSrc, { since: gulp.lastRun(css) })
            .pipe(plumber())
            // .pipe(sourcemaps.init())
            .pipe(sass(cssConfig.sassOpts).on('error', sass.logError))
            .pipe(postcss(cssConfig.postCSS))
            // .pipe(sourcemaps.write('./'))
            .pipe(
                size({
                    showFiles: true,
                }),
            )
            .pipe(
                rename({
                    suffix: '.min',
                }),
            )
            .pipe(gulp.dest(cssConfig.build))
            .pipe(
                browsersync.reload({
                    stream: true,
                }),
            );
    }

    function cssTrigger(done) {
        const mainCSS = 'src/sass/main.scss';
        const time = new Date();

        fs.utimesSync(mainCSS, time, time);

        done();
    }

    // Optimize images and create webp version
    const imgConfig = {
        src: 'src/images/*',
        build: './images/placeholders/',
        minOpts: {
            optimizationLevel: 5,
        },
    };

    function images() {
        return gulp
            .src(imgConfig.src)
            .pipe(imagemin(imgConfig.minOpts))
            .pipe(gulp.dest(imgConfig.build))
            .pipe(
                imagemin([
                    webp({
                        quality: arg.quality,
                        method: 6,
                    }),
                ]),
            )
            .pipe(extReplace('.webp'))
            .pipe(gulp.dest(imgConfig.build));
    }

    // Minify plugins
    function pluginsJS() {
        return gulp
            .src(['src/js/plugins/*.js'])
            .pipe(concat('plugins.js'))
            // .pipe(gulp.dest('js'))
            // .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('./js'))
            .pipe(
                browsersync.reload({
                    stream: true,
                }),
            );
    }

    // Minify the language files of plugins
    /* function lngJS() {
        return gulp
            .src('src/js/lng/*.js', { since: gulp.lastRun(lngJS) })
            .pipe(plumber())
            .pipe(uglify())
            .pipe(
                rename({
                    suffix: '.min',
                }),
            )
            .pipe(gulp.dest('js/lng/'))
            .pipe(
                browsersync.reload({
                    stream: true,
                }),
            );
    } */

    // Concatenate & minify critical plugins
    /* function criticalPluginsJS() {
        return gulp
            .src('src/js/critical_plugins/*.js')
            .pipe(plumber())
            // .pipe(sourcemaps.init())
            .pipe(concat('plugins.js'))
            .pipe(uglify())
            // .pipe(sourcemaps.write('./'))
            .pipe(
                size({
                    showFiles: true,
                }),
            )
            .pipe(gulp.dest('js/'))
            .pipe(
                browsersync.reload({
                    stream: true,
                }),
            );
    } */

    function mainJS() {
        return gulp
            // .src([
            //     'src/js/main.js',
            //     'src/js/components/*.js',
            // ], { since: gulp.lastRun(mainJS) })
            .src('src/js/main.js', { since: gulp.lastRun(mainJS) })
            .pipe(plumber())
            .pipe(sourcemaps.init())
            // .pipe(
            //     include({
            //         extensions: 'js',
            //         hardFail: true,
            //         includePaths: [
            //             __dirname + '/src/js/components',
            //         ],
            //     }),
            // )
            .pipe(babel())
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(
                size({
                    showFiles: true,
                }),
            )
            .pipe(gulp.dest('js/'))
            .pipe(
                browsersync.reload({
                    stream: true,
                }),
            );
    }

    // Generate SVG sprite
    const SVGconfig = {
        precision: 2,
        shape: {
            dimension: {
                precision: 2,
            },
        },
        mode: {
            symbol: {
                dest: './',
                sprite: 'icons.svg',
                prefix: '.icon-%s',
                dimensions: '%s',
            },
        },
    };

    function svg() {
        return gulp
            .src('src/icons/*.svg')
            .pipe(svgSprite(SVGconfig))
            .pipe(gulp.dest('images/'))
            .pipe(
                browsersync.reload({
                    stream: true,
                }),
            );
    }

    // Generate Critical CSS
    function criticalTask(done) {
        const readline = require('readline');

        const readInterface = readline.createInterface({
            input: fs.createReadStream('.criticalrc'),
            console: false,
        });

        readInterface.on('line', function(file) {
            critical.generate({
                inline: false,
                base: './',
                src: 'critical.' + file + '.html',
                dest: 'css/critical.' + file + '.min.css',
                inlineImages: true,
                minify: true,
                width: 1920,
                height: 1200,
                include: ['.nav>ul>li .icon', /^\.header/, /^\.hero/],
                ignore: ['@font-face'],
                pathPrefix: './',
            });
            console.log('Critical file generated for: ' + file);
        });

        done();
    }

    // Watch files for changes
    function watch(done) {
        gulp.watch('**/*.php').on('change', browsersync.reload);
        // gulp.watch(cssConfig.watchSrc, css);
        gulp.watch(cssConfig.taskSrc, css);
        gulp.watch('src/icons/*', svg);
        gulp.watch('src/js/plugins/*', pluginsJS);
        // gulp.watch(
        //     [
        //         'src/js/main.js',
        //         'src/js/components/*.js',
        //     ],
        //     mainJS,
        // );
        gulp.watch('src/js/main.js', mainJS);

        done();
    }

    // Initialize browsersync
    function server(done) {
        connect.server({ stdio: 'ignore' }, function () {
            browsersync.init({
                proxy: 'http://frontend-task.test',
                port: 8000,
                open: false,
            });
        });

        done();
    }

    exports.default = gulp.series(css, watch, server);
    // exports.default = gulp.series(css, watch);
    exports.images = gulp.series(images);
    exports.critical = criticalTask;
})();
