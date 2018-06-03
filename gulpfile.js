const gulp = require('gulp');
const gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

const {
    resolve
} = require('path');

const distPath = resolve(__dirname, 'dist');
//静态资源目录地址
const staticSources = [distPath + '/**', '!' + distPath + '/**.html'];

const remotePath = require('./config').cdn.path;

//上传静态资源到cdn

gulp.task('cdn', function() {
    const conn = ftp.create({
        host: '',
        port: '',
        user: '',
        pass: '',
        secure: true,
        secureOptions: {
            rejectUnauthorized: false
        },
        log: gutil.log
    });

    //globs--> dist目录下非html文件
    return gulp.src(staticSources, {
            base: `./dist/`,
            buffer: false
        })
        .pipe(conn.newer(remotePath)) //update newers files
        .pipe(conn.dest(remotePath));

});


const poi = require('poi');
const prodConfig = require('./config/poi.config.prod');
const rm = require('rimraf');
const {
    projectName
} = require('./config');
const serverRoot = __dirname;
const dest = resolve(serverRoot, projectName);

//将编译的文件转移到目标文件夹下
gulp.task('prod', function() {
    const app = poi(prodConfig);
    //清空dist目录
    rm(distPath, function() {
        // poi生成新的文件爱你，并拷贝到服务器目录下
        app.build().then(function() {
            //清空服务器目录，再拷贝到服务器目录下
            rm(dest, function() {
                gulp.src(distPath + '/**').pipe(gulp.dest(dest));
            });
        });
    });
});