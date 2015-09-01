// =========== [ REQUIRE ] ===========
var co = require("co");
var fs = require("fs");
var colors = require("colors");
var Prompt = require("./../../lib/prompt.js");
var path = require("path");
var spawn = require("dm-shell").spawn;
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function* publishStart(modulePath) {
    try {
        // =========== [ 1 create root path ] ===========
        var modulePath = modulePath || pwd();
        var cdCommand = "";
        if (modulePath) {
            cdCommand = "cd " + modulePath + " && ";
        }

        // =========== [ 2 git status: proof if changes are existen ] ===========
        var command = cdCommand + 'git status';
        var status = exec(command, {
            silent: true
        }).output;

        // =========== [ 3a if no changes are existent: abort task ] ===========
        if (status.indexOf("nothing to commit") > -1) {
            console.log(modulePath.green + " clean!");
        } else {
            // =========== [ 3b if changes are existen do publish job ] ===========
            console.log(modulePath.red + " publish");

            // =========== [ 4 commit current changes ] ===========
            console.log("git commit current changes: ".blue);
            spawn(command);
            var promptAnswer =
                yield Prompt({
                    type: "input",
                    name: "commitMessage",
                    message: "Please enter your commit message: "
                });
            var commitMessage = promptAnswer.commitMessage;
            //TODO
            // =========== [ use git task ] ===========
            var command = cdCommand + 'git add -A && git commit -m "' + commitMessage + '"';
            spawn(command);

            // =========== [ 5 bump version in package.json ] ===========
            // bump version
            console.log("bump version".blue);

            var bumpJob = require("../bumpVersion/index.js");
            var pathPackageJson = path.resolve(modulePath, "package.json");
            var bumpSuccessful =
                yield bumpJob.start(pathPackageJson);

            // =========== [ 6 commit the bump Version change (only the version in package.json) ] ===========
            // git commit "bumped version to ..."
            console.log("git commit bump version".blue);
            var packageJson = JSON.parse(fs.readFileSync(pathPackageJson, 'utf8'));
            var version = packageJson.version;
            var command = cdCommand + 'git add -A && git commit -m "bumped version to ' + version + '"';
            spawn(command);

            // =========== [ 7 push commits ] ===========
            console.log("git push commits".blue);
            spawn(cdCommand + 'git push -u origin master');

            // =========== [ 8 tag the version with the new version number ] ===========
            console.log("git tag".blue);
            spawn(cdCommand + 'git tag -a ' + version + ' -m "version ' + version + ' tagged"');

            // =========== [ 9 push tags ] ===========
            console.log("git push tags".blue);
            spawn(cdCommand + 'git push origin --tags');

            // =========== [ 10 publish ] ===========
            console.log("npm publish".blue);
            spawn(cdCommand + 'npm publish');
        }

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
        /* handle error */
    }
    return yield Promise.resolve();
}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
