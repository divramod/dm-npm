var co = require("co");
var jobs = {};

// =========== [ job.index() ] ===========
jobs.index = co.wrap(function*() {
    try {

        // =========== [ get params from user input ] ===========
        var argv2 = process.env.dmnJob || process.argv[2] || "help";

        // =========== [ open if ] ===========
        if (false) {}

        // automatically add tasks here


        // =========== [ getCommonTasks (dm-npm) ] ===========
        else {
            require("dm-npm").getCommonTasks(argv2, __dirname);
        }

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }

    return Promise.resolve();
}); // job.index()


// =========== [ MODULE EXPORT ] ===========
module.exports = jobs;
