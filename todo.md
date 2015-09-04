Current
====================
48
  * refactor bumpVersion to getCommonTasks
  * refactor dependent --> dm-meteor buildApp
  * refactor dependent --> dm-npm publish

Next 
====================
14. write dm- common help function (use markdown and lynx)

Next Actions
====================
47. new task
  * add task that makes it possible to incorporate different modules, other than
    dm-npm (getCommonTasks)
46. remove colors from test or add colors to package.json
44. new task
  * create and inject getCommondTasks for your own module
43. [publish]
  * bump versions in init/template/package.json too
42. add minification
41.[prompt]
  * devide between common tasks and module specific tasks
40. new task
  * make it possible to remove binaries and use new ones
39. [pubFolder]
  * give commit Message that will be used by all publishs
  * for example: adapted to getCommonTasks
38. [init]
  * add init task to config
  * add dependencies array to init
  * i always use shelljs in my project, but on standard only co and dm-npm should be dependencies (+ test libs)
37. add date and time to ideas/todos
36. autocompletion for tasks
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
12. adapt help to dm-tmux
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
20 rompt
- add: edit config to prompt
- create config if not existent
- create config.example.json on init
21. add task getConf
- usable in all modules
- gets the current conf file as variable
- abstract, so that one can use package.json too
- seperate to own module dm-json? (read file, manipulate json, beautify)
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

2015.09.02
--------------------
45 [init]
- github: state for username if not existent in .dm-npm.json
- change standard task name from test to example
- add test to example

2015.09.01
--------------------
15. task init
- ask for description
11. dmn init
* remove creation of jobs
* remove creation of docs
22. refactor
- main module must be clean 
- remove docs
- move jobs to tasks
26. task getAlias
- is needed for adding it in the readme when creating a task
29. refactor linkConfigFiles

2015.08.31
--------------------
5. add task publish all
13. open todo document to add todo [2015.08.31]
10. task [task add] [2015.08.31]
* add task automatically to global.js
* add task automatically to index.js
* add task with parameter to README.md
  * input: task description
4. add todo.md on init [2015.08.31]
