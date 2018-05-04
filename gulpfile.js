let gulp = require('gulp');
let watch = require('gulp-watch');
let sequence = require('gulp-watch-sequence');
let browserSync = require('browser-sync').create();
let gulpSequence = require('gulp-sequence');
let nodemon = require('nodemon');
let inject = require('gulp-inject-string');
//let run = require('gulp-run-command').default;
let shell = require('gulp-shell')


//--------------------------------------
gulp.task('start-server', (cb) => {
  let started = false;
  return nodemon({
    script: 'server.js'
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  });
});
//--------------------------------------


//--------------------------------------
gulp.task('rebuild-webpack', shell.task([
  'npm run build'
]))
//--------------------------------------

//--------------------------------------
gulp.task('trigger-sync', () => {
  gulp.src('./bsync.js')
    .pipe(inject.append('//reload'))
    .pipe(gulp.dest('./'));
});
//--------------------------------------


//--------------------------------------
gulp.task('browser-sync', ['start-server'], () => {


  // AFTER STARTER HAS BEEN STARTED, START BROWSERSYNC
  browserSync.init(null, 
    {proxy: 'http://localhost:3000',
      files: ['server.js', 'bsync.js'],
      port: 3030,
      reloadDelay: 2000}
  )

  // IF ANY OF THESE FILES HAVE BEEN CHANGED, COMPILE THEN START TRIGGER-SYNC, WHICH KICKS OFF BROWSERSYNC
  let queue = sequence(100);// SMALL DELAY SO CLEARHTML DOESN'T BREAK

  /* CSS */
  watch('src/**/*.*', {
    emitOnGlob: false
  }, queue.getHandler('rebuild-webpack'));

  /* CSS */
  watch('dist/server.js', {
    emitOnGlob: false
  }, queue.getHandler('trigger-sync'));
})
//--------------------------------------


//--------------------------------------
gulp.task('build', ['rebuild-webpack'], () => {});
//--------------------------------------

//--------------------------------------
gulp.task('default', ['browser-sync'], () => {});
//--------------------------------------
