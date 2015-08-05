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
        var argv3 = process.argv[3] || "help";

        // =========== [ help ] ===========
        if (["help", "-help", "h", "-h"].indexOf(argv2) > -1) {
            var task = require("./tasks/help/index.js");
            yield task.start(module_path);
        }

        // =========== [ JOBS ] ===========
        // =================================

        // =========== [ init ] ===========
        else if (["init", "-init", "i", "-i"].indexOf(argv2) > -1) {
            var job = require("./jobs/init/index.js");
            job.run();
        }
        // =========== [ publish ] ===========
        else if (["publish", "-publish", "p", "-p"].indexOf(argv2) > -1) {
            var job = require("./jobs/publish/index.js");
            yield job.start(module_path);
        }
        // =========== [ reinstall ] ===========
        else if (["reinstall", "-reinstall", "r", "-r"].indexOf(argv2) > -1) {
            var job = require("./jobs/reinstall/index.js");
            yield job.start(module_path);
        }
        // =========== [ reininit] ===========
        else if (["reinit", "-reinit"].indexOf(argv2) > -1) {
            var job = require("./jobs/reinit/index.js");
            yield job.start(module_path);
        }

        // =========== [ TASKS ] ===========
        // =================================

        // =========== [ test ] ===========
        else if (["test", "-test", "t", "-t"].indexOf(argv2) > -1) {
            var task = require("./tasks/test/index.js");
            task.test();
        }
        // =========== [ link local ] ===========
        else if (["linkLocal", "-l", "l", "local"].indexOf(argv2) > -1) {
            var task = require("./tasks/linkLocal/index.js");
            yield task.run(result);
        }
        // =========== [ install global ] ===========
        else if (["installGlobal", "-g", "g", "global"].indexOf(argv2) > -1) {
            var task = require("./tasks/installGlobal/index.js");
            yield task.run(result);
        }
        // =========== [ bump Version ] ===========
        else if (["bump", "-bump", "-b", "b"].indexOf(argv2) > -1) {
            var task = require("./tasks/bumpVersion/index.js");
            yield task.start(module_path);
        }
        // =========== [ link modules to node_modules ] ===========
        else if (["linkNode", "node", "ln", "-ln"].indexOf(argv2) > -1) {
            var task = require("./tasks/linkNodeModules/index.js");
            yield task.start(module_path);
        }
        // =========== [ add task ] ===========
        else if (["task", "-task", "t", "-t"].indexOf(argv2) > -1 && ["add"].indexOf(argv3) > -1) {
            var task = require("./tasks/addTask/index.js");
            yield task.start(module_path);
        }
        // =========== [ add job ] ===========
        else if (["job", "-job", "j", "-j"].indexOf(argv2) > -1 && ["add"].indexOf(argv3) > -1) {
            var task = require("./tasks/addJob/index.js");
            yield task.start(module_path);
        }
        // =========== [ config file add ] ===========
        else if (["config", "configFileAdd", "c", "-c"].indexOf(argv2) > -1) {
            var task = require("./tasks/configFileAdd/index.js");
            yield task.start(module_path);
        }
        

        // =========== [ help ] ===========
        else {
            var task = require("./tasks/help/index.js");
            yield task.start(module_path);
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }

    return Promise.resolve(result);
}); // job.index()

// =========== [ MODULE EXPORT ] ===========
module.exports = jobs;
