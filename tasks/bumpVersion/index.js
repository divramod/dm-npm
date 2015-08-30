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
job.start = co.wrap(function*(filepath, release_type, old_version) {
    try {
        var filepath = filepath || undefined;
        var release_type = release_type || undefined;
        var old_version = old_version || undefined;
        var hide_output = hide_output || undefined;
        var versions = {};
        if (!filepath) {
            var files = ls("*.json");
            if (test('-f', 'package.js')) {
                files.push("package.js");
            }
            if (test('-f', 'mobile-config.js')) {
                files.push("mobile-config.js");
            }
            if (files.length > 1) {

                var fileQuestion = {
                    type: "list",
                    name: "file",
                    message: "Which file do you want to bump:",
                    choices: files
                };
                var fileAnswer =
                    yield dmPrompt(fileQuestion);
                var filepath = fileAnswer.file;

            } else if (files.length === 0) {
                console.log("No file for bumping existent!".red);
            } else if (files.length === 1) {
                var filepath = files[0];
            }
        }
        if (filepath) {
            if (!release_type) {
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
                release_type = answers.release_type;
            }

            if (!old_version) {
                var packageJson = JSON.parse(fs.readFileSync(filepath, 'utf8'));
                old_version = packageJson.version;
            }
            var newVersion = semver.inc(old_version, release_type);
            var lines = exec('git tag', {
                silent: true
            }).output;
            if (lines.indexOf(newVersion) > -1) {
                var tags = lines.split(/\r?\n/);
                tags.pop();
                tags.sort(semver.compare);
                newVersion = semver.inc(tags[tags.length - 1], release_type);
            }
            //console.log("bump " + filepath);
            sed('-i', /"version": *"[0-9]+.[0-9]+.[0-9]+-?[0-9]*"/, '"version": "' + newVersion + '"', filepath);

            var newVersionString = "new version: " + newVersion;
            versions.new = newVersion;
            versions.old = old_version;
            versions.release_type = release_type;
            var oldVersionString = "old version: " + old_version;
        }
    } catch (e) {
        console.log("Filename: ", __filename, "\n", e.stack);
    }
    return versions;

}); // job.start()

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
