const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const rev = require('gulp-rev');
const inputDir = "public/dist/";
const outputDir = "public/";
const manifestFilename = "rev-manifest.json";


gulp.task('minify-js',
    _ => {
        return gulp.src('public/js/*.js')
            .pipe(uglify())
            // .pipe(rename(function (path) {
            //     path.basename += "-min";
            //     path.extname = ".js";
            // }))
            .pipe(rev())
            .pipe(gulp.dest('public/dist'));
    });

gulp.task('minify-css',
    _ => {
    return gulp.src('public/css/*.css')
        .pipe(cleanCSS())
        // .pipe(rename(function (path) {
        //     path.basename += "-min";
        //     path.extname = ".css";
        // }))
        .pipe(rev())
        .pipe(gulp.dest('public/dist'));
});

gulp.task('manifest', _ => {
    return gulp.src([inputDir + "**/*.{css,js}"])
        .pipe(rev())
        .pipe(gulp.dest(inputDir))
        .pipe(rev.manifest(manifestFilename))
        .pipe(gulp.dest(outputDir));
});
