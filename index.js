// =========== [ REQUIRE ] ===========
var co = require("co");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.index() ] ===========
// has to be started from project root
job.start = co.wrap(function*(path) {
    var result = {};
    result.pwd = pwd();
    // TODO clone project
    // TODO checkout master branches
    // TODO bower install
    // TODO restart docker container
    // TODO npm install
    job.npmInstallAll(pwd());

    return yield Promise.resolve(result);
}); // job.index()


// =========== [ job.index() ] ===========
job.npmInstallOne = co.wrap(function*(path) {
    var result = {};
    result.success = false;
    var pathBefore = pwd();
    cd(path);
    result.message = exec('npm install', {
        silent: false
    }).output;
    if (test('-d', path + "/node_modules")) {
        result.success = true;
    }
    cd(pathBefore);
    return yield Promise.resolve(result);
}); // job.index()

// =========== [ job.index() ] ===========
// TODO
job.npmInstallAll = co.wrap(function*(path) {
    var result = {};
    result.pwd = pwd();
    result.path = path;
    result.message = "installed successfully";

    var pathes = [
        path + "/dmcms",
        path + "/dmcms/dmcms-api-koa",
        path + "/dmcms/dmcms-db-mongo",
        path + "/dmcms/dmcms-helpers",
        path + "/dmcms/dmcms-jobs",
        path + "/dmcms/dmcms-project",
        path + "/dmcms/dmcms-prompt",
        path + "/dmcms/dmcms-run",
        path + "/dmcms/dmcms-site-ng",
        path + "/dmcms/dmcms-static-ng",
        path + "/dmcms/dmcms-templates"
    ];
    for (var i = 0, l = pathes.length; i < l; i++) {
        var p = pathes[i];
        yield job.npmInstallOne(p);
    }

    return yield Promise.resolve(result);
}); // job.index()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
