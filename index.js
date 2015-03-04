// =========== [ REQUIRE ] ===========
var co = require("co");
var prompt = require("co-prompt");
var colors = require("colors");
require("shelljs/global");

// =========== [ DEFINE ] ===========
var dmNpm = {};

// =========== [ npmName.start ] ===========
dmNpm.start = function() {
    var arg = process.argv[2];
    if (!arg) {
        console.log("You have to run npm init! After that you can do the following!".red);
        dmNpm.help();
    } else {

        if (arg === "-help" || arg === "-h") {
            dmNpm.help();
        } else {
            if (dmNpm.proofPrerequisits()) {

                if (arg === "-index") {
                    dmNpm.createIndexJs();
                }
                if (arg === "-test" || arg === "-t") {
                    dmNpm.createTest();
                }
                if (arg === "test") {
                    dmNpm.test();
                }
                if (arg === "-gitignore" || arg === "-g") {
                    dmNpm.createGitignore();
                }
                if (arg === "-readme" || arg === "-r") {
                    dmNpm.createReadme();
                }
                if (arg === "-init" || arg === "-i" || arg === "init") {
                    dmNpm.init();
                }
                if (arg === "-install" || arg === "-in" || arg === "install") {
                    dmNpm.install();
                }
            }
        }
    }
}; // npmName.start

// =========== [ dmNpm.test() ] ===========
// TODO
dmNpm.test = function() {
    var spawn = require('child_process').spawn;

    // Create a child process
    var child = spawn('tail', ['-f', '/var/log/system.log']);

    child.stdout.on('data',
        function(data) {
            console.log('tail output: ' + data);
        }
    );

    child.stderr.on('data',
        function(data) {
            console.log('err data: ' + data);
        }
    );

}; //dmNpm.test()


// =========== [ dmNpm.install() ] ===========
// TODO
dmNpm.install = function() {
    exec('sudo npm install . -g', {
        silent: false
    });
}; //dmNpm.install()

// =========== [ dmNpm.init() ] ===========
// TODO
dmNpm.init = function() {

    co(function*() {
        var projectName =
            yield prompt('project name: '.blue);
        process.stdin.pause();

        console.log("projectName", projectName);

        exec('mkdir ' + projectName + " && cd " + projectName, {
            silent: false
        });
        exec('npm init', {
            silent: false
        });
        dmNpm.createIndexJs();
        dmNpm.createTest();
        dmNpm.createGitignore();
        dmNpm.createReadme();
        console.log("dmNpm.init");
    });

}; //dmNpm.init()


// =========== [ dmNpm.help() ] ===========
dmNpm.help = function() {

    var version = require(__dirname + "/package.json").version;
    console.log();
    console.log("          dmnpm (".yellow + version.yellow + ") help".yellow);
    console.log("==============================================");
    console.log("-help | -h".yellow + "      --> help");
    console.log("-index".yellow + "          --> creates index.js");
    console.log("-test | -t".yellow + "      --> creates test directory with index.js ");
    console.log("-gitignore | -g".yellow + " --> creates .gitignore");
    console.log("-readme | -r".yellow + "    --> creates README.markdown");
    console.log("-init | -i".yellow + "      --> initialized npm module");
}; //dmNpm.help()


// =========== [ dmNpm.proofPrerequisits() ] ===========
dmNpm.proofPrerequisits = function() {
    if (!test("-f", "package.json")) {
        console.log("No package.json existent. Please run npm init!".red);
        return false;
    } else {
        return true;
    }
}; //dmNpm.proofPrerequisits()


// =========== [ dmNpm.createReadme() ] ===========
dmNpm.createReadme = function() {

    var src = __dirname + "/templates/README.markdown";
    exec('cp ' + src + " " + pwd(), {
        silent: true
    });

    var name = require(pwd() + "/package.json").name;
    exec('sed -i s/dmNpmName/' + name + '/g ' + 'README.markdown', {
        silent: true
    });

    console.log("README.md created".green);

}; //dmNpm.createReadme()


// =========== [ dmNpm.createGitignore() ] ===========
dmNpm.createGitignore = function() {
    var src = __dirname + "/templates/gitignore";
    exec('cp ' + src + " " + pwd() + "/.gitignore", {
        silent: true
    });
    console.log(".gitignore created".green);

}; //dmNpm.createGitignore()


// =========== [ dmNpm.createTest() ] ===========
dmNpm.createTest = function() {
    var src = __dirname + "/templates/test";
    exec('cp -r ' + src + " .", {
        silent: true
    });
    var name = require(pwd() + "/package.json").name;
    exec('sed -i s/dmNpmName/' + name + '/g ' + pwd() + '/test/index.js', {
        silent: true
    });

    console.log("test/index.js created".green);
}; //dmNpm.createTest()



// =========== [ dmNpm.createIndexJs() ] ===========
dmNpm.createIndexJs = function() {
    var src = __dirname + "/templates/index.js";
    exec('cp ' + src + " .", {
        silent: true
    });
    var name = require(pwd() + "/package.json").name;
    exec('sed -i s/dmNpmName/' + name + '/g ' + 'index.js', {
        silent: true
    });
    console.log("index.js created".green);
}; //dmNpm.createIndexJs()


module.exports = dmNpm;
