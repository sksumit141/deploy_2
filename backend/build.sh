#!/usr/bin/env bash
# build.sh

echo "Installing Chrome for Puppeteer..."

# Download and install Chromium for Puppeteer
npx puppeteer browsers install chrome

# Then build your app or continue with other steps
npm install
