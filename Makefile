.PHONY: clean
clean:
	rimraf **/{.eslintcache,.cspellcache} **/node_modules/{*,.*} apps/{frontend,backend,gh-pages}/{dist,*.tsbuildinfo,coverage,.turbo} apps/frontend/public/storybook apps/frontend/.storybook/static cypress/{videos,screenshots}

.PHONY: initdb
initdb:
	cd apps/backend && yarn prisma:init

.PHONY: log
log:
	heroku logs --tail -a instagram-clone-api-server
