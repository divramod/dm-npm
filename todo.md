Current
====================
14. write dm- common help function
13. open todo document to add todo

Next Actions
====================
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
22. refactor
- mein vorzeigeprojekt muss clean sein
- remove docs
- move jobs to tasks


Change Log
====================
10. task [task add] [2015.08.31]
* add task automatically to global.js
* add task automatically to index.js
* add task with parameter to README.md
  * input: task description
4. add todo.md on init [2015.08.31]
