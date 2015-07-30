# Shorcuts
    dmn
    dm-npm

## Description
This command line tool helps to fulfill the daily jobs you have to do when working with npm modules.

## Environment
- tested with node 0.11.11 and 0.12.0

## Installation

    npm install dm-npm -g

## Prerequisits
- for publishing a module you have to create accounts on:
  - [npmjs.com]( http://npmjs.com )
  - [github.com](http://github.com)

## Init a npm module
- create github repository (online)
- clone the repository (local)
- cd into the repository (local)
- run (local)
    dmn init
- run (local)
    npm install
- run (local)
    dmn publish

## Jobs and Tasks
- For running the jobs and tasks, you have cd into the module you want to work with.
- I devided the todos i have to solve in a npm project into tasks (mostly one simple command) and jobs (a more complex combination of tasks).

### Jobs

    dmn [help|-help|-h|h]               --> help
    dmn [init|-init|i|-i]               --> init a npm module from a empty git repository
    dmn [publish|-publish|p|-p]         --> publish the current module (commit, bump version, tag, ...)
    dmn [reinstall|-reinstall|r|-r]     --> reinstall node modules (remove node_modules dir and npm install)
    dmn [reininit|-reininit]            --> reinitialize the node module (deletes all current files and creates them new from the template files)

### Tasks

    dmn [linkLocal|local|-l|l]          --> linking the current module locally for global usage (prevents to reinstall module globally after every change)
    dmn [installGlobal|global|-g|g]     --> installs the module global (ie npm install -g .)
    dmn [bump|-bump|-b|b]               --> bumps the version in package.json
    dmn [linkNode|node|ln|-ln]          --> links local existing direcotries in the node_modules folder (for being able to use the current stage of development from modules the module is dependent on)
    dmn [task|-task|t|-t] [add]         --> creates a bootstrapped task in diretory tasks (if the folder modules is existent you can choose one of them as target)
    dmn [job|-job|j|-j] [add]           --> creates a bootstrapped job in directory jobs (if the folder modules is existent you can choose one of them as target)

### npm

    npm test                            --> runs the tests

## Testing
- i am not really done here

    npm test

## Links
- [npm access problem](http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo)
- [node global acces problem](http://stackoverflow.com/questions/15636367/nodejs-require-a-global-module-package)
- [creating and publishing a node-js module]( https://quickleft.com/blog/creating-and-publishing-a-node-js-module/ )
- [npm run script environment](https://oncletom.io/2014/self-contained-node-scripts/)
