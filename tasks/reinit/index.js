// =========== [ REQUIRE ] ===========
var co = require("co");
var dmPrompt = require("dm-prompt").Inquirer;
var dmnInit = require("./../init/index.js");
var spawn = require("dm-shell").spawn;
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function* publishStart(module_name) {
    //TODO
    // =========== [ delete bin links ] ===========
    try {
        console.log("Reinstall npm modules".red);
        console.log("Be careful. This task deletes all files and directories in this folder and init's a new module".red);
        var deleteAnswer =
            yield dmPrompt({
                type: "input",
                name: "delete",
                message: "Do you really whant to delete all files the directory " + process.cwd().red + " is containing? [Y]"
            });
        var deleteIt = deleteAnswer.delete;
        if (deleteIt === "Y") {
            exec("find . -type f -not -name '*md' -not -name 'index.js' -not -path '*/.*/*' | xargs rm", {
                silent: false
            });
            dmnInit.run();
        }


    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
        /* handle error */
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
