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
        var modulePath = modulePath || pwd();
        var cdCommand = "";
        if (modulePath) {
            cdCommand = "cd " + modulePath + " && ";
        }

        // get path
        var executionPath = process.cwd();

        // git status, git commit changes if existent (unique)
        var command = cdCommand + 'git status';
        var status = exec(command, {
            silent: true
        }).output;
        if (status.indexOf("nothing to commit") > -1) {
            console.log(modulePath.green + " clean!");
        } else {
            console.log(modulePath.red + " publish");
            console.log("git commit current changes: ".blue);
            spawn(command);
            var promptAnswer =
                yield Prompt({
                    type: "input",
                    name: "commitMessage",
                    message: "Please enter your commit message: "
                });
            var commitMessage = promptAnswer.commitMessage;
            var command = cdCommand + 'git add -A && git commit -m "' + commitMessage + '"';
            spawn(command);

            // bump version
            console.log("bump version".blue);

            var bumpJob = require("../../tasks/bumpVersion/index.js");
            var pathPackageJson = path.resolve(modulePath, "package.json");
            var bumpSuccessful =
                yield bumpJob.start(pathPackageJson);

            // git commit "bumped version to ..."
            console.log("git commit bump version".blue);
            var packageJson = JSON.parse(fs.readFileSync(pathPackageJson, 'utf8'));
            var version = packageJson.version;
            var command = cdCommand + 'git add -A && git commit -m "bumped version to ' + version + '"';
            spawn(command);

            // push commit
            console.log("git push commits".blue);
            spawn(cdCommand + 'git push -u origin master');

            // git tag 
            console.log("git tag".blue);
            spawn(cdCommand + 'git tag -a ' + version + ' -m "version ' + version + ' tagged"');

            // git push tags
            console.log("git push tags".blue);
            spawn(cdCommand + 'git push origin --tags');

            // npm publish
            console.log("npm publish".blue);
            spawn(cdCommand + 'npm publish');
        }

    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
        /* handle error */
    }
    return yield Promise.resolve();
}); // job.start()

//function spawn(command) {
    //var spawn = require('child_process').spawnSync;
    //var myProcess = spawn('sh', ['-c', command], {
        //stdio: 'inherit'
    //});
//}

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
