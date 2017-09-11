'use strict';

import config      from './config';
import fs          from 'graceful-fs';
import gulp        from 'gulp';
import gutil       from 'gulp-util';

// Tasks
import clean                     from './gulp/tasks/clean';
import {version,bundler,scripts} from './gulp/tasks/scripts';
import * as lint                 from './gulp/tasks/lint';
import test                      from './gulp/tasks/test';
import * as deploy               from './gulp/tasks/deploy';
import * as browser              from './gulp/tasks/browser';
import archive                   from './gulp/tasks/archive';
import release                   from './gulp/tasks/release';

if (config.production) {
  gutil.log(gutil.colors.bold.green('�  Production Mode'));
} else {
  gutil.log(gutil.colors.bold.green('�  Development Mode'));
}

gulp.task('version', version());
gulp.task('bundler', bundler());
gulp.task('scripts', scripts());
gulp.task('clean', clean(config.scripts.dest));

// Build the files
gulp.task('build', gulp.series('clean', 'version', 'bundler', 'scripts'));

// Lint Scripts
gulp.task('lint:script:src', lint.es(config.scripts.src));
gulp.task('lint:script:dest', lint.es(config.scripts.dest));
gulp.task('lint:script:test', lint.es(config.scripts.test));
gulp.task('lint:script:gulp', lint.es(config.scripts.gulp, {rules: {'no-console': 'off'}}));
gulp.task('lint:script', gulp.series('lint:script:src', 'lint:script:dest', 'lint:script:test', 'lint:script:gulp'));

// Run karma for development, will watch and reload
gulp.task('tdd', test());

// Run tests and report for ci
gulp.task('test', test({
  singleRun: true,
  browsers: ['PhantomJS'],
  reporters: ['mocha']
}));

gulp.task('coverage', test({
  singleRun: true,
  browsers: ['PhantomJS'],
  reporters: ['coverage'],
}));

// Deploy
gulp.task('deploy:prompt', deploy.prompt);
gulp.task('deploy:version', deploy.version);
gulp.task('deploy:message', deploy.message);
gulp.task('deploy:init', deploy.init);
gulp.task('deploy:commit', deploy.commit);

// Generates compiled CSS and JS files and puts them in the dist/ folder
gulp.task('deploy:dist', gulp.series('build'));
gulp.task('deploy:prepare', gulp.series('deploy:prompt', 'deploy:version', 'deploy:init', 'deploy:dist'));
gulp.task('deploy', gulp.series('deploy:prompt', 'deploy:version', 'deploy:message', 'deploy:dist', 'deploy:commit'));

// Archive the distrubution files into package
gulp.task('archive', archive());

// Starts a BrowerSync instance
gulp.task('serve', browser.init());

// Reload browser
gulp.task('reload', browser.reload());

// Watch files for changes
gulp.task('watch', () => {
  gulp.watch(config.scripts.src, gulp.series('scripts', 'reload'));
});

// Release task
gulp.task('release', release());

// Dev task
gulp.task('dev', gulp.series('build', 'serve'));

// Register default task
gulp.task('default', gulp.series('lint:script:src', 'serve'));
