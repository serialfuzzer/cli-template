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
    const fileName = options.file; // file name that was passed as a CLI flag
    const domain = options.domain; // in case target was supplied via the domain flag too
    var targetsFromFile = []; // array to hold targets from a file, won't be able to load extremely large files, the tool is going to break if you try to import unnecessarily large file
    if(fileName != ""){
        targetsFromFile = helper.getTargetsFromFile(fileName); // if file name is not empty, read contents of the file and put it all into the targetsFromFile array
    }
    var targets = helper.combineTargets(stdinTargets, targetsFromFile, domain); // all the targets passed via different options (stdin, -f, -d) are combined into a single array so that I could easily work on that array
    if(targets.length == 0){
        cli.help() // if number of supplied targets == 0, print cli help
    } else {
        // do something with the targets 
        targets.map(target=>console.log(target))
    }
    
})


cli.parse(process.argv)
