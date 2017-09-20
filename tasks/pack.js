import gulp from 'gulp';
import { colors, log } from 'gulp-util';
import zip from 'gulp-zip';
// import packageDetails from '../package.json';
import packageDetails from '../app/manifest.json';

import args from './lib/args';

function getPackFileType(){
  switch(args.vendor){
    case 'firefox':
      return '.xpi';
    default:
      return '.zip';
  }
}

gulp.task('pack', () => {
  // let name = packageDetails.name;
  let name = packageDetails.short_name;
  // let version = packageDetails.version;
  let version = packageDetails.version_name;
  let filetype = getPackFileType();
  let filename = `${name}-${version}-${args.vendor}${filetype}`;
  return gulp.src(`dist/${args.vendor}/**/*`)
    .pipe(zip(filename))
    .pipe(gulp.dest('./packages'))
    .on('end', () => {
      let distStyled = colors.magenta(`dist/${args.vendor}`);
      let filenameStyled = colors.magenta(`./packages/${filename}`);
      log(`Packed ${distStyled} to ${filenameStyled}`);
    });
});
