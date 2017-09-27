/**
 * Created by wtw on 2017/9/26.
 */

'use strict';
/**
 * 1. LESS编译 压缩 合并
 * 2. JS合并 压缩 混淆
 * 3. img复制
 * 4. html压缩
 */

var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');//js合并
var cssnano = require('gulp-cssnano');//css压缩
var uglify = require('gulp-uglify');//压缩，混淆
var htmlmin = require('gulp-htmlmin');//压缩html
var browserSync = require('browser-sync');
/*var reload = browserSync.reload;*/

gulp.task('style',function(){
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])//省去被导入的文件
        .pipe(less())//less-css
        .pipe(cssnano())  //css压缩
        .pipe(browserSync.reload({
            stream:true
        }))
        .pipe(gulp.dest('dist/styles'));

    });

gulp.task('script',function(){
    gulp.src(['src/scripts/*.js'])
        .pipe(concat('all.js'))//js合并为all.js
        .pipe(uglify())//js压缩混淆
        .pipe(browserSync.reload({
            stream:true
        }))
        .pipe(gulp.dest('dist/scripts'))
});

gulp.task('image',function(){
    gulp.src(['src/images/*'])
        .pipe(browserSync.reload({
            stream:true
        }))
        .pipe(gulp.dest('dist/images'))
});


gulp.task('html',function(){
    gulp.src(['src/*.html'])
        .pipe(htmlmin({collapseWhitespace:true,
                        removeComments:true
        }))//压缩，去掉空白字符
        .pipe(browserSync.reload({
            stream:true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('serve',function(){
    browserSync({
        server:{
            baseDir:['dist']//设dist为根目录
        }

    },function(err,bs){



    });
    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*',['image']);
    gulp.watch('src/*.html',['html']);

});