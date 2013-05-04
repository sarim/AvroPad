all: update-js update-css

update-js:
	@git show master:dist/js/jquery.atwho.min.js > assets/js/jquery.atwho.min.js
	@git show master:dist/js/jquery.atwho.js > assets/js/jquery.atwho.js

update-css:
	@git show master:dist/css/jquery.atwho.css > assets/css/jquery.atwho.css
