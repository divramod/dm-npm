// =========== [ REQUIRE ] ===========
var co = require("co");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
// TODO
job.start = co.wrap(function*(module_path) {

    // =========== [ JOBS ] ===========
    var command = "cat " + module_path + "/README.md";
    var readme = exec(command, {
        silent: true
    }).output;

    console.log(readme.blue);

    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
