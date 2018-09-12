'use strict';

import config from '../../config';
import releaseIt     from 'release-it';
import handleErrors  from '../util/handleErrors';
import {argv} from 'yargs';

export default function release() {
  let options = {};
  options.increment = argv.increment || "patch";
  options.verbose = argv.verbose || true;
  options.debug = argv.debug || false;
  options.force = argv.force || false;
  options['dry-run'] = argv['dry-run'] || false;
  options.requireCleanWorkingDir = false;
  options.tagName = "v%s";
  options.tagAnnotation = "Release v%s";
  options.buildCommand = "gulp build";
  options.pkgFiles = ["package.json", "bower.json"]
  config.setEnv('production');

  return function(done) {
    releaseIt(options).then(done).catch(handleErrors);
  }
}
