var path = require('path');
var exec = require('child_process').exec;
var os = require('os');

var requireSha = module.exports = function(workingDir, sha, cb) {
  if(typeof sha == 'function') {
    cb = sha;
    sha = workingDir;

    workingDir = os.tmpDir();
  }
  var moduleDir = path.join(workingDir, sha);
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
        cb(null, require(moduleDir), clean);
      });
    });
  });
};

//returns the current sha of the module
//only used in testing
requireSha._getCurrentSha = function(cb) {
  exec('git log --max-count=1 --format=%h', {cwd: __dirname}, function(err, stdout) {
    if(err) return cb(err);
    return cb(null, stdout.trim());
  });
};
