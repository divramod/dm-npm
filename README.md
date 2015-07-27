# dmName
alias dmnpm

## Description
This command line tool helps to fulfill the daily jobs you have to do when working wiht npm modules.

## Environment
- tested with node 0.11.11 and 0.12.0

## Installation
- npm install dm-npm -g

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

## Options jobs

    help | -help | -h | h               --> help
    init | -init | i | -i               --> init a npm module from a empty git repository
    publish | -publish | p | -p         --> publish the current module (commit, bump version, tag, ...)

## Options Tasks
    linkLocal | local | -l | l          --> linking the current module locally for global usage (prevents to reinstall module globally after every change)
    installGlobal | global | -g | g     --> installs the module global (ie npm install -g .)
    bump | -bump | -b | b               --> bumps the version in package.json


## Links
- [npm access problem](http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo)
- [node global acces problem](http://stackoverflow.com/questions/15636367/nodejs-require-a-global-module-package)
- [creating and publishing a node-js module]( https://quickleft.com/blog/creating-and-publishing-a-node-js-module/ )
- [npm run script environment](https://oncletom.io/2014/self-contained-node-scripts/)
