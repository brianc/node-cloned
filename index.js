var path = require('path');
var exec = require('child_process').exec;

var requireSha = module.exports = function(workingDir, sha, cb) {
  var moduleDir = path.join(workingDir, sha);
  exec('git clone . ' + moduleDir, function(err, stdout, stderr) {
    if(err) throw err;
    var options = {
      cwd: moduleDir
    };
    exec('git checkout ' + sha, options, function(err, stdout, stderr) {
      if(err) throw err;
      cb(null, require(moduleDir), function(cb) {
        require('rmdir')(moduleDir, cb);
      });
    });
  });
};

requireSha.CURRENT_SHA = '183bfd9';
