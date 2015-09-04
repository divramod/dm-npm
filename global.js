var colors = require("colors");
var co = require("co");
var jobs = {};
var result = {};
var module_path = __dirname;
require("shelljs/global");

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

        // =========== [ getCommonTasks ] ===========
        if (['getCommonTasks','gct'].indexOf(argv2) > -1) {
            var task = require("./tasks/getCommonTasks/index.js");
            yield task.start();
        }

        // automatically add tasks here

        // =========== [ configGet ] ===========
        else if (['configGet','cg'].indexOf(argv2) > -1) {
            var task = require("./tasks/configGet/index.js");
            task.start();
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
