const cli = require("commander");
const fs = require("fs");
const process = require("process");
const helper = require("./helper");
const controller = require("./controller");
const isStdinEmpty = process.stdin.isTTY || false;


var stdinTargets = [];

if(!isStdinEmpty){
    var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
    targets = stdinBuffer.toString().split("\n").filter(e=>e.length>0).map(e=>e.replace(/\r?\n|\r/g, ""));
    stdinTargets = targets;
}



cli
.description("Description")
.option("-f, --file <value>", "File to import targets from", "")
.option("-d, --domain <value>", "Domain to scan", "")
.action(async function(options){
        // parse
})


cli.parse(process.argv)