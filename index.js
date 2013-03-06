var path = require('path');
var exec = require('child_process').exec;
var os = require('os');

var cloned = module.exports = function(sha, cb) {
  var moduleDir = path.join(cloned.workingDir, sha);
  var options = { cwd: moduleDir };
  var clean = function(cb) {
    require('rmdir')(moduleDir, cb);
  };
  exec('git clone . ' + moduleDir, function(err, stdout, stderr) {
    if(err) return cb(err, null, clean);
    exec('git checkout ' + sha, options, function(err, stdout, stderr) {
      if(err) return cb(err, null, clean);
      exec('npm install', options, function(err, stdout, stderr) {
        if(err) return cb(err, null, clean);
        cb(null, moduleDir, clean);
      });
    });
  });
};

cloned.workingDir = require('os').tmpDir();

//returns the current sha of the module
//only used in testing
cloned._getCurrentSha = function(cb) {
  exec('git log --max-count=1 --format=%h', {cwd: __dirname}, function(err, stdout) {
    if(err) return cb(err);
    return cb(null, stdout.trim());
  });
};
