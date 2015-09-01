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

        // automatically add tasks here

        // =========== [ help ] ===========
        else if (['help','-help','h','-h'].indexOf(argv2) > -1) {
            var task = require("./tasks/help/index.js");
            yield task.start();
        }
        // =========== [ getCommonTasks ] ===========
        else if (['getCommonTasks','gct'].indexOf(argv2) > -1) {
            var task = require("./tasks/getCommonTasks/index.js");
            yield task.start();
        }
        // =========== [ t1 ] ===========
        else if (['t1','t23'].indexOf(argv2) > -1) {
            var task = require("./tasks/t1/index.js");
            yield task.start();
        }
        // =========== [ bump Version ] ===========
        else if (["bump", "-bump", "-b", "b"].indexOf(argv2) > -1) {
            var task = require("./tasks/bumpVersion/index.js");
            yield task.start();
        }
        // =========== [ idea ] ===========
        else if (['idea'].indexOf(argv2) > -1) {
            var task = require("./tasks/idea/index.js");
            yield task.start(__dirname);
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
        // =========== [ publish ] ===========
        else if (["publish", "-publish"].indexOf(argv2) > -1) {
            var task = require("./tasks/publish/index.js");
            yield task.start();
        }
        // =========== [ publishFolder ] ===========
        else if (['publishFolder','pubFol', 'pf', '-pf'].indexOf(argv2) > -1) {
            var task = require("./tasks/publishFolder/index.js");
            yield task.start();
        }
        // =========== [ prompt ] ===========
        else if (["prompt","p"].indexOf(argv2) > -1) {
            var task = require("./tasks/prompt/index.js");
            yield task.start(__dirname);
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
        // =========== [ task add ] ===========
        else if (["taskAdd", "-taskAdd", "ta", "-ta"].indexOf(argv2) > -1) {
            var task = require("./tasks/taskAdd/index.js");
            yield task.start(__dirname);
        }
        // =========== [ test ] ===========
        else if (["test", "-test", "t", "-t"].indexOf(argv2) > -1) {
            var task = require("./tasks/test/index.js");
            task.start();
        }
        // =========== [ todo ] ===========
        else if (['todo','na'].indexOf(argv2) > -1) {
            var task = require("./tasks/todo/index.js");
            yield task.start();
        }

        // =========== [ config file add ] ===========
        else if (["config", "configFileAdd", "c", "-c"].indexOf(argv2) > -1) {
            var task = require("./tasks/configFileAdd/index.js");
            yield task.start();
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
