// =========== [ REQUIRE ] ===========
var co = require("co");
var Prompt = require("./../../lib/prompt.js");
var dmnInit = require("./../init/index.js");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function* publishStart(module_name) {
    try {
        console.log("Reinstall npm modules\n\n".red);

        console.log("delete directory node_modules".blue);
        var deleteAnswer =
            yield Prompt({
                type: "input",
                name: "delete",
                message: "Do you really whant to delete all files the directory " + process.cwd().red + " is containing? [Y]"
            });
        var deleteIt = deleteAnswer.delete;
        if (deleteIt === "Y") {
            exec('rm -rf *', {
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
