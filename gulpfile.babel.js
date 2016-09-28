'use strict';

import fs          from 'graceful-fs';
import gulp        from 'gulp';
import config      from './config';

// Tasks
import clean                     from './gulp/tasks/clean';
import {version,bundler,scripts} from './gulp/tasks/scripts';
import * as lint                 from './gulp/tasks/lint';
import test                      from './gulp/tasks/test';
import * as deploy               from './gulp/tasks/deploy';
import * as browser              from './gulp/tasks/browser';
import archive                   from './gulp/tasks/archive';
import release                   from './gulp/tasks/release';

gulp.task('version', version());
gulp.task('bundler', bundler());
gulp.task('scripts', scripts());
gulp.task('clean', clean(config.scripts.dest));

// Build the files
gulp.task('build', gulp.series('clean', 'version', 'bundler', 'scripts'));

// Lint Scripts
gulp.task('lint:es:src', lint.es(config.scripts.src));
gulp.task('lint:es:dest', lint.es(config.scripts.dest));
gulp.task('lint:es:test', lint.es(config.scripts.test));
gulp.task('lint:es:gulp', lint.es(config.scripts.gulp, {rules: {'no-console': 'off'}}));
gulp.task('lint:es', gulp.series('lint:es:src', 'lint:es:dest', 'lint:es:test', 'lint:es:gulp'));

gulp.task('lint:js:src', lint.js(config.scripts.src));
gulp.task('lint:js:dest', lint.js(config.scripts.dest));
gulp.task('lint:js:test', lint.js(config.scripts.test));
gulp.task('lint:js:gulp', lint.js(config.scripts.gulp));
gulp.task('lint:js', gulp.series('lint:js:src', 'lint:js:dest', 'lint:js:test', 'lint:js:gulp'));

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
gulp.task('deploy:pull', deploy.pull);

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

// Register default task
gulp.task('default', gulp.series('lint:es:src', 'serve'));
