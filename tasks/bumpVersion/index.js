// =========== [ REQUIRE ] ===========
var co = require("co");
var semver = require("semver");
var fs = require('fs');
var Prompt = require("./../../lib/prompt.js");
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*() {
    try {

        console.log("bump version");
        var question = {
            type: "list",
            name: "release_type",
            message: "What do you want to do?",
            choices: [
                "patch",
                "minor",
                "major",
                "premajor",
                "preminor",
                "prepatch",
                "prerelease"
            ]
        };

        var answers =
            yield Prompt(question);

        console.log(answers);

        var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        var newVersion = semver.inc(packageJson.version, answers.release_type);
        sed('-i', /"version": *"[0-9]+.[0-9]+.[0-9]+"/, '"version": "' + newVersion + '"', 'package.json');

        var newVersionString = "new version: " + newVersion;
        var oldVersionString = "old version: " + packageJson.version
        console.log(oldVersionString.yellow, newVersionString.green);
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }

}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
