.PHONY: clean
clean:
	rimraf **/node_modules/{*,.*} apps/{frontend,backend}/{dist,*.tsbuildinfo,coverage,.turbo} apps/frontend/public/storybook

.PHONY: log
log:
	heroku logs --tail -a instagram-api-server
