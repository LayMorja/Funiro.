
export const json = () => {
	return src(app.path.src.json)
      .pipe(plumber())
      .pipe(dest(app.path.build.json))
}