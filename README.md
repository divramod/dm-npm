# dmName
alias dmnpm

## Description
- tested with node 0.11.11 and 0.12.0

## Installation
- npm install dm-npm -g

## Prerequisits

## Options

    -help | -h      --> help
    -index | -i     --> creates index.js"
    -test | -t      --> creates test directory with index.js "
    -gitignore | -g --> creates .gitignore"
    -readme | -r    --> creates README.markdown"
    -all | -a       --> creates all"

## Steps
- create index.js (from template)
- create test/index.js (from template)
- create .gitignore (from template)
- create README.md
- RUN npm init
- RUN npm install mocha --save-dev
- RUN npm install chai --save-dev
- RUN initial test
- RUN npm publish

## Links
- [npm access problem](http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo)
- [node global acces problem](http://stackoverflow.com/questions/15636367/nodejs-require-a-global-module-package)
- [creating and publishing a node-js module](https://quickleft.com/blog/creating-and-publishing-a-node-js-module/)
- [npm run script environment](https://oncletom.io/2014/self-contained-node-scripts/)
