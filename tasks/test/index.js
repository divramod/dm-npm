// =========== [ REQUIRE ] ===========
var co = require("co");
var dmu = require("dm-util");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
// TODO
job.start = co.wrap(function*() {
    console.log("test");
    dmu.start("hello");
}); // job.start()


// =========== [ MODULE EXPORT ] ===========
module.exports = job;
