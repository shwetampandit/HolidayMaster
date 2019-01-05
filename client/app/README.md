# Vue Client app
# Kindly do rename yor application in package.json name
# Pre-requisite
- NPM and/or Yarn installed
# Steps
- Install vue cli 3 [VUE CLI 3](https://cli.vuejs.org/guide/installation.html) 
```sh
    npm install -g @vue/cli
    # OR
    yarn global add @vue/cli
    # Check using
    vue --version
```
- Navigate to project client/app and execute
```sh
    npm install
```
- execute below command it start browser which help for run, build, testing etc
```sh
    vue ui
```
- You can also use cmd for executing
```sh
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "test:unit": "vue-cli-service test:unit",
    "test:e2e": "vue-cli-service test:e2e"
```
- once vue ui started click on import and add your app (it emit error if node_module not installed )
- go to tasks menu and click on Serve (for running app) 
- Other option like build , analyzer, plugin installation etc.
- You can also updating serve execution script in package.json by adding
```sh
Usage: vue-cli-service serve [options] [entry]

Options:
  --open    open browser on server start
  --copy    copy url to clipboard on server start
  --mode    specify env mode (default: development)
  --host    specify host (default: 0.0.0.0)
  --port    specify port (default: 8080)
  --https   use https (default: false)
```
  