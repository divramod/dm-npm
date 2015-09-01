Current
====================

Next 
====================
14. write dm- common help function (use markdown and lynx)
26. task getAlias
- is needed for adding it in the readme when creating a task

Next Actions
====================
35. add task
  * manage tests via cli
  * check/uncheck tests which should be run
34. [task add]
  * add test
33. [init]
  * add git remote from dmn-config.json in which the github user name is stated
32. [reinit]
  * unlink binaries
31. add task
  * add module
  * should link also in global.js
  * should link also in index.js
1. change dmn node in that way, that only this dm-npm-modules are linked which exist in package.json dependencies
  - the must exist in the given path to
  - get default path from .dm-npm
  - set default path to ~/code/dm if .dm-npm path is not present
  - use current path ?
2. change dmn linkLocal in that way, that only this dm-npm-modules are linked which exist in package.json dependencies
  - the must exist in the given path to
  - get default path from .dm-npm
  - set default path to ~/code/dm if .dm-npm path is not present
3. use dm-git in publish
  - for status
5. add task publish all
6. add task update dm-* dependencies (after publishing)
7. add task update dm-* dependencies for all
- npm update??
8. dmn config
- link file to directory where all dotfiles are saved
- add functions to own prompt function
  - create config from example
  - mv to different directory
  - edit
9. publish
- create a parameter docs that makes it possible to avoid the commit message
- ie: dmn publish docs --> should create the commit message: improved docs
11. dmn init
* remove creation of jobs
* remove creation of docs
12. adapt help to dm-tmux
15. task init
- ask for description
16.[portable node](https://gist.github.com/domenic/2790533)
17. task task remove
- remove index.js entry
- remove global.js entry
- remove README task entry
- remove README config entry
18. task: addTask
- add entry in config (ask)
19. task todo:
- problem when opening over dmn propmt
20. prompt
- add: edit config to prompt
- create config if not existent
- create config.example.json on init
21. add task getConf
- usable in all modules
- gets the current conf file as variable
- abstract, so that one can use package.json too
- seperate to own module dm-json? (read file, manipulate json, beautify)
22. refactor
- main module must be clean 
- remove docs
- move jobs to tasks
23. task new
- move .dm-???.json to dotfiles and link them
- get the target from .dm-npm.json config
24. task prompt
- add possibility to publish from prompt
25. todo
- write with prompt --> faster, i sometimes forgot the idea before i opened the file
27. module
- write aliase gdmn directly in npm module so that zsh aliases wont be needed anymore
28. prompt
- open github repository in browser/lync from prompt
30. add task
- move config files to directory and link them

Change Log
====================
29. refactor linkConfigFiles [2015.09.01]
13. open todo document to add todo [2015.08.31]
10. task [task add] [2015.08.31]
* add task automatically to global.js
* add task automatically to index.js
* add task with parameter to README.md
  * input: task description
4. add todo.md on init [2015.08.31]
