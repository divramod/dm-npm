// =========== [ REQUIRE ] ===========
var co = require("co");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.run = co.wrap(function*() {
    var result = {};
    exec('npm install . -g', {
        silent: false
    });
    return yield Promise.resolve(result);
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
