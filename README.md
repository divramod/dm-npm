# dm-npm
The tool for npm-module maniacs.

## Description
* This command line tool helps to fulfill the daily jobs you have to do when working with npm modules.
* Documention in progress.

## Shorcuts
    dmn
    dm-npm


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

## Generators
Most of the jobs and tasks here use the yield style and assume the code is contained within a generator function. For example you can use co for that. This style requires ES6 generators and has to be enabled in node 0.11.x or greater via the --harmony flag.

## Jobs and Tasks
- For running the jobs and tasks, you have to cd into the module you want to work with.
- I devided the todos i have to solve in a npm project into tasks (mostly one simple command) and jobs (a more complex combination of tasks).

## Jobs

    dmn [help|-help|-h|h]               --> help
    dmn [init|-init|i|-i]               --> init a npm module from a empty git repository
    dmn [publish|-publish|p|-p]         --> publish the current module (commit, bump version, tag, ...)
    dmn [reinstall|-reinstall|r|-r]     --> reinstall node modules (remove node_modules dir and npm install)
    dmn [reininit|-reininit]            --> reinitialize the node module (deletes all current files and creates them new from the template files)

## Tasks

### publishFolder
* command
```javascript
dmn publishFolder
```
* publishes all npm modules in a given folder
* publishing includes:
  * ask for the directory including the to-publish npm-modules (gets publishFolder.path from ~/dm-npm.json as default)
    * dirctories starting with _ (underscore) are ignored
  * then for every directory in the path the task publish will be run with the given directory sub path as the root for the publish task

### publish
* command
```javascript
dmn publishFolder
```
#### publish steps
1. get/create root path (.git-repository with package.json for npm)
2. get git status 
3. switch git status
   * a) if git status (2) says nothing to commit, abort task (path clean)
   * b) if git status (2) says there is something to commit (go on)
4. commit current changes
5. bump version in package.json (see task bump version)
6. commit the bump Version change
7. push commits
8. tag new version
9. push tags
10. npm publish

### prompt
* prompts for execution of the existent tasks of npm module
* examples 
```javascript
alias prompt // 
```

### idea
* add ideas to the npm-module via shell (ideas will be added to ideas.md)
* examples 
```javascript
alias idea // 
```

### todo
* opens the todo.md file of the npm module
* examples 
```javascript
alias todo // 
```

### misc tasks
    dmn [linkLocal|local|-l|l]          --> linking the current module locally for global usage (prevents to reinstall module globally after every change)
    dmn [installGlobal|global|-g|g]     --> installs the module global (ie npm install -g .)
    dmn [bump|-bump|-b|b]               --> bumps the version in package.json
    dmn [linkNode|node|ln|-ln]          --> links local existing direcotries in the node_modules folder (for being able to use the current stage of development from modules the module is dependent on)
    dmn [task|-task|t|-t] [add]         --> creates a bootstrapped task in diretory tasks (if the folder modules is existent you can choose one of them as target)
    dmn [job|-job|j|-j] [add]           --> creates a bootstrapped job in directory jobs (if the folder modules is existent you can choose one of them as target)

### npm

    npm test                            --> runs the tests


## Config
* you can place a .dm-npm.json file in your home directory (~/.dm-npm.json)
* the following things are allowed at the moment
```javascript
{
  "publishFolder": {
    "path": "~/code/dm"
  }
}
```

## Testing
- i am not really done here ;-)

    npm test

## Links
- [npm access problem](http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo)
- [node global acces problem](http://stackoverflow.com/questions/15636367/nodejs-require-a-global-module-package)
- [creating and publishing a node-js module]( https://quickleft.com/blog/creating-and-publishing-a-node-js-module/ )
- [npm run script environment](https://oncletom.io/2014/self-contained-node-scripts/)

## Lessons Learned
