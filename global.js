var colors = require("colors");
var co = require("co");
require("shelljs/global");
var jobs = {};
var result = {};
var module_path = __dirname;

process.on('exit', function(code) {
    //console.log(code);
});
process.on('uncaughtException', function(code) {
    console.log(code);
});

// =========== [ job.index() ] ===========
jobs.index = co.wrap(function*() {
    try {

        // =========== [ get params from user input ] ===========
        var argv2 = process.argv[2] || "help";

        // automatically add tasks here

        // =========== [ getCommonTasks ] ===========
        if (['getCommonTasks','gct'].indexOf(argv2) > -1) {
            var task = require("./tasks/getCommonTasks/index.js");
            yield task.start();
        }
        // =========== [ init ] ===========
        else if (["init", "-init", "i", "-i"].indexOf(argv2) > -1) {
            var task = require("./tasks/init/index.js");
            task.run();
        }
        // =========== [ install global ] ===========
        else if (["installGlobal", "-g", "g", "global"].indexOf(argv2) > -1) {
            var task = require("./tasks/installGlobal/index.js");
            yield task.run(result);
        }
        // =========== [ linkConfigFiles] ===========
        else if (["linkConfigFiles", "lc"].indexOf(argv2) > -1) {
            var task = require("./tasks/linkConfigFiles/index.js");
            yield task.start();
        }
        // =========== [ link local ] ===========
        else if (["linkLocal", "-l", "l", "local"].indexOf(argv2) > -1) {
            var task = require("./tasks/linkLocal/index.js");
            yield task.run(result);
        }
        // =========== [ link modules to node_modules ] ===========
        else if (["linkNode", "node", "ln", "-ln"].indexOf(argv2) > -1) {
            var task = require("./tasks/linkNodeModules/index.js");
            yield task.start(module_path);
        }
        // =========== [ publishFolder ] ===========
        else if (['publishFolder','pubFol', 'pf', '-pf'].indexOf(argv2) > -1) {
            var task = require("./tasks/publishFolder/index.js");
            yield task.start();
        }
        // =========== [ reininit] ===========
        else if (["reinit", "-reinit"].indexOf(argv2) > -1) {
            var task = require("./tasks/reinit/index.js");
            yield task.start(module_path);
        }
        // =========== [ reinstall ] ===========
        else if (["reinstall", "-reinstall"].indexOf(argv2) > -1) {
            var task = require("./tasks/reinstall/index.js");
            yield task.start();
        }

        // =========== [ configFileAdd ] ===========
        else if (["config", "configFileAdd", "c", "-c"].indexOf(argv2) > -1) {
            var task = require("./tasks/configFileAdd/index.js");
            yield task.start();
        }

        // =========== [ getCommonTasks ] ===========
        else {
            require("dm-npm").getCommonTasks(argv2, __dirname);
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }

    return Promise.resolve(result);
}); // job.index()

// =========== [ MODULE EXPORT ] ===========
module.exports = jobs;
