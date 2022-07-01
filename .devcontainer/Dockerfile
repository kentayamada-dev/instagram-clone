# Install Node 16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-16-bullseye

# Update packages
RUN apt update && export DEBIAN_FRONTEND=noninteractive

# Install cypress prerequisites packages
RUN apt -y install --no-install-recommends libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

# Install global node modules
RUN su node -c "npm install -g rimraf"

# Install the Heroku CLI
RUN curl https://cli-assets.heroku.com/install.sh | sh
