/**
 *
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 *
 */

const mix = require("laravel-mix");
const webpack = require("webpack");

const fs = require("fs"); // i dont know what is it, but mqpacker without this - dont work. Maybe FileSystem?
const mqpacker = require("css-mqpacker"); // combaine all media queries by a groups
const sortCSSmq = require("sort-css-media-queries"); //custom sorting for mqpacker

mix.options({
    processCssUrls: false,
    autoprefixer: false,
    postCss: [
        require("css-mqpacker")({
            sort: sortCSSmq
        }),
        // require("autoprefixer")({
        //     grid: "autoplace",
        //     remove: true
        // })
    ]
});

mix.setPublicPath('dist');
mix.webpackConfig({
    resolve: {
        extensions: [".js"],
        modules: ["node_modules"],
        alias: {
            /** GSAP */
            // 'TweenLite': 'gsap/src/minified/TweenLite.min.js',
            // 'TweenMax': 'gsap/src/minified/TweenMax.min.js',
            // 'TimelineLite': 'gsap/src/minified/TimelineLite.min.js',
            // 'TimelineMax': 'gsap/src/minified/TimelineMax.min.js',
            
            /** ScrollMagic and bridge GSAP */
            // 'ScrollMagic': 'scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
            // 'animation.gsap': 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
        }
    },
    plugins: []
});

if (mix.inProduction()) {
    
    mix.options({
        // drop all consoles
        terser: {
            terserOptions: {
                compress: {
                    "drop_console": true
                }
            }
        }
    });
    
    // combine all imported modules and libs to single ECMAScript 2015+ file.
    mix.js("resources/js/app.js", "js/vanilla-app.js");
    mix.js("resources/js/system.js", "js/vanilla-system.js");
    mix.js("resources/js/polyfill.js", "js/vanilla-polyfill.js");
    
    // convert single file into a backwards compatible
    // version of JavaScript in current and older browsers.
    mix.babel("dist/js/vanilla-app.js", "dist/js/app.js");
    mix.babel("dist/js/vanilla-system.js", "dist/js/system.js");
    mix.babel("dist/js/vanilla-polyfill.js", "dist/js/polyfill.js");
    
    mix.then(function () {
        
        let filesToClear = ["dist/js/vanilla-app.js", "dist/js/vanilla-system.js", "dist/js/vanilla-polyfill.js"];
    
        for (let i = 0; i < filesToClear.length; i++) {
            fs.stat(filesToClear[i], function(err, stats) {
                console.log(stats);
                if (stats && stats.isFile()) {
                    fs.unlink(filesToClear[i], (err) => {
                        if (err) throw err;
                        console.log(filesToClear[i] + ' - was deleted');
                    });
                }
            });
        }
        
        
    }); //<-- Will be triggered each time Webpack finishes building.
    
    
} else {
    
    //section for development, will not work IE11<, safari 9.1.3<
    mix.js("resources/js/app.js", "dist/js/app.js");
    mix.js("resources/js/system.js", "dist/js/system.js");
    mix.js("resources/js/polyfill.js", "dist/js/polyfill.js");
    // mix.sourceMaps();
}

// fonts, images, temporary diresctories
mix.copyDirectory('resources/fonts', 'dist/fonts/');
mix.copyDirectory('resources/image', 'dist/image/');
mix.copyDirectory('resources/video', 'dist/video/');
mix.copyDirectory('resources/html', 'dist/');
// mix.copyDirectory("from", "to");

mix.sass("resources/sass/app.sass", "dist/css/app.css");

mix.extract([
    'axios',
    'gsap',
    'lodash.debounce',
    'sweetalert2'
]);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();

// mix.browserSync('name.domain');
