// =========== [ REQUIRE ] ===========
var co = require("co");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
// TODO
job.start = co.wrap(function*(module_path) {
    console.log("publishe");
    var executionPath = process.cwd();

    //TODO git status, git commit changes if existent (unique)

    // bump version
    var bumpJob = require(module_path + "/tasks/bumpVersion/index.js");
    yield bumpJob.start();
    console.log("after bump");

    //TODO git commit "bumped version to ..."
    var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    var version = packageJson.version;
    console.log(packageJson);
    //exec('git add -A && git commit -m "bumped version to ' + version + '"', {
      //silent: false
    //});

    //TODO git tag 

    //TODO git push tags

    //TODO npm publish

    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
