import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import path from "path";
import del from "del";
import runSequence from "gulp4-run-sequence";
import babel from "gulp-babel";

const plugins = gulpLoadPlugins();

const paths = {
  js: ["./**/*.js", "!dist/**", "!node_modules/**"],
  nonJs: ["./package.json", "./**/*.ejs"]
};

// Clean up dist and coverage directory
gulp.task("clean", done => {
  del.sync(["dist/**", "!dist", "!coverage"]);
  done();
});

// Set env variables
gulp.task("set-env", () => {
  plugins.env({
    vars: {
      NODE_ENV: "test"
    }
  });
});

// Copy non-js files to dist
gulp.task("copy", () =>
  gulp
    .src(paths.nonJs)
    .pipe(plugins.newer("dist"))
    .pipe(gulp.dest("dist"))
);

// Compile ES6 to ES5 and copy to dist
gulp.task("babel", () =>
  gulp
    .src([...paths.js, "!gulpfile.babel.js"], { base: "." })
    .pipe(plugins.newer("dist"))
    .pipe(plugins.sourcemaps.init())
    .pipe(babel())
    .pipe(
      plugins.sourcemaps.write(".", {
        includeContent: false,
        sourceRoot(file) {
          return path.relative(file.path, __dirname);
        }
      })
    )
    .pipe(gulp.dest("dist"))
);

// Start server with restart on file changes
gulp.task(
  "nodemon",
  gulp.series(gulp.parallel("copy", "babel"), done => {
    plugins.nodemon({
      script: path.join("dist", "index.js"),
      ext: "js",
      ignore: ["node_modules/**/*.js", "dist/**/*.js"],
      tasks: ["clean", "copy", "babel"]
    });
    done();
  })
);

// gulp serve for development
gulp.task(
  "serve",
  gulp.series(done => {
    runSequence("nodemon");
    done();
  })
);

// default task: clean dist, compile js files and copy non-js files.
gulp.task(
  "default",
  gulp.series(done => {
    runSequence(["copy", "babel"]);
    done();
  })
);
