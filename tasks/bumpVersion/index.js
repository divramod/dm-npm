// =========== [ REQUIRE ] ===========
var co = require("co");
var semver = require("semver");
var colors = require("colors");
var fs = require('fs');
var dmPrompt = require("dm-prompt").Inquirer;
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.start() ] ===========
job.start = co.wrap(function*() {
    try {
        var files = ls("*.json");
        if (files.length > 1) {

            var fileQuestion = {
                type: "list",
                name: "file",
                message: "Which file do you want to bump:",
                choices: files
            };
            var fileAnswer =
                yield dmPrompt(fileQuestion);
            var file = fileAnswer.file;

        } else if (files.length === 0) {
            console.log("No file for bumping existent!".red);
        } else if (files.length === 1) {
            var file = files[0];

        }
        if (file) {
            var question = {
                type: "list",
                name: "release_type",
                message: "What do you want to do?",
                choices: [
                    "prerelease",
                    "patch",
                    "minor",
                    "major",
                    "premajor",
                    "preminor",
                    "prepatch"
                ]
            };
            var answers =
                yield dmPrompt(question);

            var packageJson = JSON.parse(fs.readFileSync(file, 'utf8'));
            var lines = exec('git tag', {
                silent: true
            }).output;
            var newVersion = semver.inc(packageJson.version, answers.release_type);
            if (lines.indexOf(newVersion) > -1) {
                var tags = lines.split(/\r?\n/);
                tags.pop();
                tags.sort(semver.compare);
                newVersion = semver.inc(tags[tags.length - 1], answers.release_type);
            }
            sed('-i', /"version": *"[0-9]+.[0-9]+.[0-9]+-?[0-9]*"/, '"version": "' + newVersion + '"', file);

            var newVersionString = "new version: " + newVersion;
            var oldVersionString = "old version: " + packageJson.version
            console.log(oldVersionString.yellow, newVersionString.green);
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }

}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
