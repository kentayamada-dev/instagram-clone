.PHONY: clean
clean:
	rimraf **/node_modules/{*,.*} apps/{frontend,backend}/{dist,*.tsbuildinfo,coverage,.turbo} apps/frontend/public/storybook apps/frontend/.storybook/static
