var path = require('path');
var gulp         = require('gulp');
var $            = require('gulp-load-plugins')();
var gulp_watch   = require('gulp-watch');
var rimraf       = require('rimraf');
var server       = require('gulp-develop-server');
var sequence     = require('run-sequence');

console.log('Building application map from the absolute_root: ' + __dirname);

var serverOptions = {
  path: './bin/start',
  execArgv: ['--harmony']
  //args: ['--runMode=' + runMode]
};
gulp.task('build:public:clean', function() {
});
gulp.task('build:public:static', function() {
});
gulp.task('build:public:img', function() {
});
gulp.task('build:public:js', function() {
});
gulp.task('build:public:sass', function() {
});
gulp.task('build:public:css', function() {
});
gulp.task('build:public:vendor', function() {
});
gulp.task('build:views', function() {
});

gulp.task('server:start', function() {
  server.listen(serverOptions, function(error) {
    console.log(error);
  });
});
gulp.task('server:restart', function() {
  console.log('Running task server:restart');
  server.restart(function(error) {
    console.log(error);
  });
});

gulp.task('watch', function() {
  // The built in gulp.watch cannot watch for new/deleted files. So we use gulp-watch instead.
  // It does not support the normal task runner at this point, so trigger it via gulp.start.
  // Unfortunatly, the built in gulp.watch also blocks logging. The callback style below does not.);
  gulp_watch(path.join(__dirname, '/.env'),      () => gulp.start('server:restart'));
  gulp_watch(path.join(__dirname, '/app/**'),    () => gulp.start('server:restart'));
  gulp_watch(path.join(__dirname, '/bin/**'),    () => gulp.start('server:restart'));
  gulp_watch(path.join(__dirname, '/config/**'), () => gulp.start('server:restart'));
  gulp_watch(path.join(__dirname, '/core/**'),   () => gulp.start('server:restart'));
  gulp_watch(path.join(__dirname, '/routes/**'), () => gulp.start('server:restart'));
  gulp_watch(path.join(__dirname, '/keystone/**.js'),   () => gulp.start('server:restart'));

  gulp_watch(path.join(__dirname, '/public/**/!(images|javascripts|sass|stylesheets)*'), () => gulp.start('build:public:static'));
  gulp_watch(path.join(__dirname, '/public/images/**'),                                  () => gulp.start('build:public:img'));
  gulp_watch(path.join(__dirname, '/public/javascripts/**'),                             () => gulp.start('build:public:js'));
  gulp_watch(path.join(__dirname, '/public/sass/**'),                                    () => gulp.start('build:public:sass'));
  gulp_watch(path.join(__dirname, '/public/stylesheets/**'),                             () => gulp.start('build:public:css'));
  gulp_watch(path.join(__dirname, '/public/vendor/**'),                                  () => gulp.start('build:public:vendor'));
  gulp_watch(path.join(__dirname, '/views/**'),                                          () => gulp.start('build:views'));
});

gulp.task('default', function() {
  sequence('build:public:clean', ['build:public:static', 'build:public:img', 'build:public:js', 'build:public:sass', 'build:public:css', 'build:public:vendor', 'build:views'], 'server:start', 'watch');
});