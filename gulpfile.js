var gulp = require('gulp'),
uglify = require('gulp-uglify');
gulp.task('script', function() {
return gulp.src('public/nej-master/src/**/*.js') //压缩的文件
.pipe(uglify())
.pipe(gulp.dest('dist/src/**')) //输出文件夹
});
