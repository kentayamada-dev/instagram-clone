.PHONY: clean
clean:
	rimraf **/node_modules/{*,.*} apps/{frontend,backend}/{dist,*.tsbuildinfo,coverage,.turbo} apps/frontend/public/storybook apps/frontend/.storybook/static apps/frontend/cypress/videos

.PHONY: initdb
initdb:
	cd apps/backend && yarn prisma:init

.PHONY: log
log:
	heroku logs --tail -a instagram-clone-api-server
