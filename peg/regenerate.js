/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var fs = require("fs");
var PEG = require("pegjs");

var source =  fs.readFileSync('normalize_parser.pegjs', 'utf8');

var parser = PEG.buildParser(source);
//var parser = require("./normalize_parser");

var meta = require("./normalize_meta");

var result = parser.parse(meta.criteria)
 
console.log(result);
 
fs.writeFileSync('normalize.js', result);
