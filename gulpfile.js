var gulp        = require('gulp'),
    babel = require('gulp-babel'),//es6转es5
    uglify = require('gulp-uglify'),//js压缩仅支持es5写法
    cleancss = require('gulp-clean-css'),//css压缩
    less = require('gulp-less'),//编译less
    autoprefixer = require('gulp-autoprefixer'),//CSS浏览器前缀补全
    watch = require('gulp-watch'),//监听
    merge = require('merge-stream'),
    del = require('del'),//删除
    notify = require('gulp-notify'),
    debug = require('gulp-debug'),
    plumber = require('gulp-plumber')
    jshint=require('gulp-jshint');//语法检查

var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var reload  = browserSync.reload;
var utils = require('./build/utils');



/*复制 编译后的代码到托管目录*/
gulp.task('build', function() {

  var ress=gulp.src(['server/dist/**/*.*', '!server/dist/**/*.html'])
      .pipe( gulp.dest(''));

var reshtml= gulp.src(['server/dist/**/*.html'])
      .pipe( gulp.dest('server/views/admin'));

      return merge(ress, reshtml);

})

//删除掉上一次构建时创建的资源
gulp.task('clean', function() {
  return del(['server/dist/*']);
});


//lib库复制
gulp.task('copylib',function(){
  var jslib= gulp.src('server/public/javascripts/lib/**/*.*')
        .pipe( gulp.dest('server/dist/javascripts/lib'));

  var csslib= gulp.src('server/public/stylesheets/lib/**/*.*')
        .pipe( gulp.dest('server/dist/stylesheets/lib'));

  return merge(jslib, csslib);
});


//css 编译压缩
gulp.task('miniCss', function(){

    return gulp.src(['server/public/stylesheets/manager/*.less'])
    .pipe( debug({title: '编译css:'}))
    .pipe( plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe( less())
    .pipe( autoprefixer({
        browsers: ['last 3 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        remove:true //是否去掉不必要的前缀 默认：true
    }))
    .pipe( cleancss({
      compatibility: 'ie8',
      advanced: true,
      keepSpecialComments: '*'
     }) )
    .pipe( gulp.dest('server/dist/stylesheets/manager/') ) //输出文件夹
    .pipe(reload({stream: true})); //编译后注入到浏览器里实现更新
});

gulp.task('minifyjs', function(){

  return gulp.src(['server/public/javascripts/**/*.js','!server/public/javascripts/lib/**/*.*'])
      .pipe( plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
      .pipe( debug({title: '编译js'}))
      .pipe( babel({presets: ['es2015','stage-3']})) //es6转es5
      .pipe( jshint())//语法检查
      // .pipe( uglify({
      //     //  mangle: {except: ['require' ,'exports' ,'module' ,'$']}
      //     }).on('error',function(e){
      //      console.error('【minifyjs】错误信息:',e);
      //    }) )//发布的时候才压缩
      .pipe( gulp.dest('server/dist/javascripts'))  //输出
      .pipe(reload({stream: true})); //编译后注入到浏览器里实现更新

});

gulp.task('dev',['miniCss','minifyjs','copylib'], function() {

})
// 静态服务器 + 监听 scss/html 文件

gulp.task('server',function(cb){
  var started=false;

    nodemon({
        ignore:['gulpfile.js','./node_modules/','./src/','./dist/'], //忽略不需要监视重启的文件 ,
        script: 'server/bin/www'
    }).on('start',function(){
      if (!started) {
        started = true;
        browserSync.init({
            files: ['./server/views/**/*.*'], //, './public/**/*.*'（和浏览器注入脚本不能同事使用）
            proxy: 'http://'+utils.getIPAdress()+':3066/', //设置代理运行本地的3000端口
            port: 8066,
            browser: 'chrome',
            notify: false
        },function(){
            console.log('浏览器已刷新')
        })
      }
    });

    gulp.watch(['server/public/stylesheets/**/*.{css,less}'],  ['mini_main_css']);
    gulp.watch(['server/public/javascripts/**/*.js'], ['minifyjs']);

})


// 静态服务器
gulp.task('up', function() {
    browserSync.init({
      port:8888,
      browser: 'chrome',
      notify: false,
      server: {
          baseDir: "./dist",
      }
    });

});
