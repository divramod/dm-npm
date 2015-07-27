var co = require("co");
var jobs = {};
var result = {};

// =========== [ jobs.index() ] ===========
jobs.index = co.wrap(function*() {
    try {


    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }

    return Promise.resolve(result);
}); // jobs.index()

// =========== [ MODULE EXPORT ] ===========
module.exports = jobs;
