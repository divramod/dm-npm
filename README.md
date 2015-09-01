# dm-npm
The tool for npm-module maniacs.

## Description
* This command line tool helps to fulfill the daily jobs you have to do when working with npm modules.
* Documention in progress.

## Shorcuts
    dmn
    dm-npm

## Environment
- tested on ubuntu 14.04 with node 0.11.11 and 0.12.0

## Installation

    npm install dm-npm -g

## Prerequisits
- for publishing a module you have to create accounts on:
  - [npmjs.com]( http://npmjs.com )
  - [github.com](http://github.com)

## Init a new npm module
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
Most of the tasks here use the yield style and assume the code is contained within a generator function. For example you can use co for that. This style requires ES6 generators and has to be enabled in node 0.11.x or greater via the --harmony flag.

## Task List
* [bumpVersion](#bumpversion)
* [configFileAdd](#configfileadd)
* [idea](#idea)
* [init](#init)
* [installGlobal](#installglobal)
* [linkConfigFiles](#linkconfigfiles)
* [linkLocal](#linklocal)
* [linkNodeModules](#linknodemodules)
* [prompt](#prompt)
* [publish](#publish)
* [publishFolder](#publishfolder)
* [reinit](#reinit)
* [reinstall](#reinstall)
* [taskAdd](#taskadd)
* [todo](#todo)

## Tasks

### [init](tasks/init/index.js) [task list](#task-list)
* initiate a new npm module with the dm-npm flavor

#### global usage
```javascript
dmn [init|-init|i|-i]
```
#### programmatically usage

#### init steps
0. User Input: 
  * module name: for example fooBar
  * module Shortcut: for example fb
1. add .gitignore from [template](tasks/init/template/gitignore)
2. add package.json from [template](tasks/init/template/package.json)
3. add index.js from [template](tasks/init/template/index.js)
  * this file is the entrypoint for programatically usage
4. add global.js from [template](tasks/init/template/global.js)
  * this file is the entrypoint for usage from the command line
5. add README.md from [template](tasks/init/template/README.md)
6. add todo.md from [template](tasks/init/template/todo.md)
7. add test directory
8. add bin directory
  * the binary file for global usage
  * this one is important. adds the following aliase, you can use from command line
    * `fooBar # runs your module`
    * `fb # alias for fooBar`
    * `gfb # cd into your module`
    * `fbg # cd into your module`
9. add tasks directory with test task
10. run `npm install`
  * install the dependencies
11. run task [create local link](#config)
  * 

After running that command your module is globally installed and you have the following features enabled for your module.

#### features

##### global (run from everywhere)
* `fb # opens cat's the readme.md`
* `fb prompt # opens a prompt with all added tasks`
* `fb todo # opens the todo.md file with vim`
* `fb idea # asks for a idea you have for your project and adds it to the end of ideas.md. creates ideas.md if not existent`
* `[gfb|fbg] # cd into the module directory (no need to create aliases)`

##### local (run from npm module directory)
* `gfb && dmn task add // adds a tasks in dir tasks and makes it programmatically and globally available`

### [publishFolder](tasks/publishFolder/index.js) [task list](#task-list)
* publishes all npm modules in a given folder

#### global usage
```javascript
dmn [publishFolder|pubFol|pf|-pf]
```

#### programmatically usage (todo)
```javascript
```

#### publishFolder steps
1. searches for publishFolder.path in ~/dm-npm.json for usage as default value
2. asks for the directory including the npm-modules destined to publish
  * dirctories starting with _ (underscore) will be ignored
3. then, a loop will run the task [publish](#publish) for every directory included in the prompted path

### [publish](tasks/publish/index.js) [tasks list](#taskslis) [task list](#task-list)

#### command
```javascript
dmn [publish|-publish]
```
#### publish steps
1. get/create root path (.git-repository with package.json for npm)
2. get git status 
3. switch git status
   - a) if git status (2) says nothing to commit, abort task (path clean)
   - b) if git status (2) says there is something to commit (go on)
4. commit current changes
5. bump version in package.json (see task [bump version](#bumpVersion))
6. commit the bump Version change
7. push commits
8. tag new version
9. push tags
10. npm publish

### [linkConfigFiles](tasks/linkConfigFiles/index.js) [task list](#task-list)
* links files from given directory into home directory 

#### global usage
```
dmn [linkConfigFiles|lc]
```

#### programmatically usage

#### linkConfigFile steps
1. search for ~/.dm-npm.json and get linkConfigFiles.path as default value
  * for example ~/dotfiles/npm-modules-config
2. prompt user for directory where the npm module files are placed
3. links the src to the home directory
  * adds a . to the beginning of the filename and soft links it in the home directory
  * ie: ln -s ~/dotfiles/npm-modules-config/fb.json ~/.fb.json

### idea
* add ideas to the npm-module via shell (ideas will be added to ideas.md)
* examples 
```javascript
alias idea // 
```

### prompt [task list](#task-list)
* prompts for execution of the existent tasks of npm module
* examples 
```javascript
alias prompt // 
```

### todo [task list](#task-list)
* opens the todo.md file of the npm module
* examples 
```javascript
alias todo // 
```

## Config [task list](#task-list)
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
