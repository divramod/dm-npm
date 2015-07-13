/**
 *
 * TODO
 */

// =========== [ REQUIRE ] ===========
var co = require("co");
var colors = require("colors");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.run ] ===========
job.run = co.wrap(function* jobRun(result) {

    // =========== [ start ] ===========
    console.log("\njob job started".yellow);

    result.message = "job job";
    result.success = false;

    // =========== [ bin directory ] ===========
    var exampleTask = require("./taskExample.js");
    var exampleResult =
        yield exampleTask.create();

    // =========== [ done ] ===========
    console.log("init done".yellow);

    return yield Promise.resolve();
}); // job.run

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
