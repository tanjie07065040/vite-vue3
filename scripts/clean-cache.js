const gulp = require('gulp');
const del = require('del');
//#region  清除缓存
gulp.task('cleanCache', gulp.series(() => {
  return del(['node_modules/.cache', 'dist']);
}));
//#endregion