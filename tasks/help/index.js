// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
// TODO
job.start = co.wrap(function*(module_path) {

    // =========== [ docs ] ===========
    var command = "cat " + module_path + "/docs/TASKS.md";
    var tasksDocs = exec(command, {
        silent: true
    }).output;

    // =========== [ HEADER ] ===========
    console.log("Help\n========================================\n".yellow);

    // =========== [ SWITCH ] ===========
    if (process.argv[3] === "jobs") {
        console.log(jobsDocs.green);
    } else if (process.argv[3] === "tasks") {
        console.log(tasksDocs.blue);
    } else {
        console.log(jobsDocs.green);
        console.log(tasksDocs.blue);
    }

    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
