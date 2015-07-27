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
        console.log("Publish Module\n===============");

        // get path
        var executionPath = process.cwd();

        // git status, git commit changes if existent (unique)
        console.log("git commit current changes: ".blue);
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
        console.log("bump version".blue);
        var bumpJob = require(module_path + "/tasks/bumpVersion/index.js");
        var bumpSuccessful =
            yield bumpJob.start();

        // git commit "bumped version to ..."
        console.log("git commit bump version".blue);
        var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        var version = packageJson.version;
        exec('git add -A && git commit -m "bumped version to ' + version + '"', {
            silent: false
        });

        // push commit
        console.log("git push commits".blue);
        exec('git push -u origin master', {
            silent: false
        });

        // git tag 
        console.log("git tag".blue);
        exec('git tag -a ' + version + ' -m "version ' + version + ' tagged"', {
            silent: false
        });

        // git push tags
        console.log("git push tags".blue);
        exec('git push origin --tags', {
            silent: false
        });

        // npm publish
        console.log("npm publish".blue);
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
