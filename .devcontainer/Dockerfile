# Install Node 16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-16-bullseye

# Install OS packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends graphviz

# Install global node modules
RUN su node -c "npm install -g rimraf"

# Install the Heroku CLI
RUN curl https://cli-assets.heroku.com/install.sh | sh
