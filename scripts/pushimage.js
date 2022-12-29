const gulp = require('gulp');
const del = require('del');

//推送镜像
const tar = require('gulp-tar');
const Docker = require('dockerode');
const config = require('../package.json');

//镜像信息初始化
var imageName = '172.22.3.5:9002/mew/' + config.name + ':' + config.version;
var fileTarName = config.name + '-' + config.version + '.tar';
var auth = {
  username: 'tanjie',
  password: '12345678',
  email: 'admin@example.com',
  serveraddress: 'http://172.22.3.5:9002',
};
var docker = new Docker({ host: 'http://172.22.3.101', port: 2375 });

//#region  NPM发布Docker镜像

gulp.task(
  'copy',
  gulp.series(() => {
    return gulp.src('Dockerfile').pipe(gulp.dest('dist'));
  }),
);

gulp.task(
  'tar',
  gulp.series('copy', () => {
    return gulp.src('./dist/**').pipe(tar(fileTarName)).pipe(gulp.dest('.'));
  }),
);

// 容器化部署 镜像
gulp.task(
  'pushImage',
  gulp.series('tar', (done) => {
    docker.buildImage('./' + fileTarName, { t: imageName }, (err, response) => {
      if (err) {
        console.log(err);
      }
      response.pipe(process.stdout, {
        end: true,
      });
      response.on('end', function () {
        var image = docker.getImage(imageName);
        console.log(image);
        image.history(function (err, res) {
          if (err) {
            return console.log(err);
          }
        });

        image.push(
          { tag: config.version },
          (err, response) => {
            if (err) {
              console.log(err);
            }
            response.pipe(process.stdout, {
              end: true,
            });
            response.on('end', function () {
              image.remove();
            });
          },
          auth,
        );
      });
    });
    del([fileTarName]);
    done();
  }),
);

//#endregion
