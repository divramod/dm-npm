// =========== [ REQUIRE ] ===========
var co = require("co");
var dmu = require("dm-util");
var dmPrompt = require("dm-prompt");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
// TODO
job.start = co.wrap(function*() {
    console.log("test");
    dmu.start("hello");
}); // job.start()

job.test = co.wrap(function*() {

    var testAnswer =
        yield dmPrompt({
            type: "input",
            name: "test",
            message: "Hello Test"
        });
    var test = testAnswer.test;
    console.log(test);
});

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
