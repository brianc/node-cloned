var exec = require('child_process').exec;

var requireSha = module.exports = function(workingDir, sha, cb) {
  exec('git clone . ' + workingDir, function(err, stdout, stderr) {
    if(err) throw err;
    var options = {
      cwd: workingDir
    };
    exec('git checkout ' + sha, options, function(err, stdout, stderr) {
      if(err) throw err;
      cb(null, require(workingDir));
    });
  });
};

requireSha.CURRENT_SHA = 'd1a57ed';
