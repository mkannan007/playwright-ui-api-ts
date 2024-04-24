FROM node:20

WORKDIR /e2e

ARG CI=true

ENV TAG='@smoke'

# Install Google Chrome
RUN apt-get update && apt-get install -y wget \
  && wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
  && apt-get update && apt-get install -y ./google-chrome-stable_current_amd64.deb

COPY package*.json ./

# Install Playwright and browser dependencies
RUN npm install
RUN npx playwright install --with-deps chromium

COPY . .

CMD npx playwright test --grep $TAG
