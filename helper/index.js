const fs = require("fs");
var path = require("path");
var Helper = function () {}

Helper.prototype = {
    getTargetsFromFile: function(filePath){
        var targets = [];
        if(filePath != ""){
            const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
            data.split("\n").map(target=>{
                targets.push(target.trim());
            })
        }
        return targets;
    },
    combineTargets: function (...args) {
        var targetsArray = [];
        args.map( function (arg) {
            if(Array.isArray(arg)){
                arg.map(target => {
                    targetsArray.push(target);
                })
            }else{
                if(arg!= ""){
                    targetsArray.push(arg);
                }
            }
        })
        return targetsArray;
    }
}

var HelperInstance = new Helper();

module.exports = HelperInstance;
