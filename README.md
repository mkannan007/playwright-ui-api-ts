# Playwright Test Automation Framework Setup

## Installation required on local machine

1.  Install the latest stable version of Node.js (NPM will be defaulted).
    #### Download link: https://nodejs.org/en/download/
2.  Install the latest version of git.
    #### Download link: https://git-scm.com/downloads/
3.  Install the latest version of docker
    #### Download link: https://www.docker.com/products/docker-desktop/
4.  Install the latest version of Google chrome
    #### Download link: https://www.google.co.uk/chrome/

## Check the installation on the local machine

1.  Run the command `node --version` in the terminal to verify the node installation
2.  Run the command `npm --version` in the terminal to verify the npm installation
3.  Run the command `git --version` in the terminal to verify the git installation
4.  Run the command `docker --version` in the terminal to verify the docker installation

## Clone the git-hub repository

Clone the git-hub repository to your local machine,

#### Reference link: https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository/

## Set Env variables
set the env variables like username, password in .env file 
            `STANDARD_USERNAME=standard_user`
            `LOCKED_OUT_USERNAME=locked_out_user`
            `PASSWORD=secret_sauce`

## Install Node Module dependencies

Goto Terminal and Run the following commands,
1.  `npm install` to install all the node module dependencies
2.  `npx playwright install` to install the playwright browsers

## Run Automated Test using local terminal

Goto Terminal and Run the following command,

1.  `npx playwright test` to run the tests in local

## Run Automated Test using docker container

Goto Terminal and Run the following command,

1.  Make sure docker daemon is running (open Docker Deskop application)
2.  `$env:TAG="@smoke"; docker compose up --build --abort-on-container-exit` to run the tests in local (windows powershell)

## Project Folder Structure

1.  The code for the environment config files are maintained under the `config` directory
2.  The code for the test data files are maintained under the `data` directory
3.  The code for the helper function are maintained under the `helper` directory
4.  The code for the test fixtures are maintained under the `hooks` directory
5.  The code for the enum files are maintained under the `libraries` directory
6.  The code for user data generation are maintained under the `models` directory
7.  The code for the page wise object repositories are maintained under the `pages` directory
8.  The code for the tests are maintained under the `tests` directory
9.  The GitHub Actions workflows/scheduled jobs are maintained under the `.github` directory

## Report

The test reports and outcomes will be generated under the `target and html` directory
