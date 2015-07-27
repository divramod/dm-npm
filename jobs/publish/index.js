// =========== [ REQUIRE ] ===========
var co = require("co");
var fs = require("fs");
var Prompt = require("./../../lib/prompt.js");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function* publishStart(module_path) {
    try {
        console.log("publish job");
        var executionPath = process.cwd();

        // git status, git commit changes if existent (unique)
        exec('git status', {
            silent: false
        });

        var promptAnswer =
            yield Prompt({
                type: "input",
                name: "commitMessage",
                message: "Please enter your commit message: "
            });
        var commitMessage = promptAnswer.commitMessage;
        exec('git add -A && git commit -m "' + commitMessage + '"', {
            silent: false
        });

        // bump version
        var bumpJob = require(module_path + "/tasks/bumpVersion/index.js");
        var bumpSuccessful =
            yield bumpJob.start();

        // git commit "bumped version to ..."
        var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        var version = packageJson.version;
        exec('git add -A && git commit -m "bumped version to ' + version + '"', {
            silent: false
        });

        // push commit
        exec('git push -u origin master', {
            silent: false
        });

        // git tag 
        exec('git tag -a ' + version + ' -m "version ' + version + ' tagged"', {
            silent: false
        });

        // git push tags
        exec('git push origin --tags', {
            silent: false
        });

        // npm publish
        exec('npm publish', {
            silent: false
        });

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
        /* handle error */
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
