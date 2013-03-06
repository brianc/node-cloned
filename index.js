var exec = require('child_process').exec;

var requireSha = function(workingDir, sha, cb) {
  exec('git clone . ' + workingDir, function(err, stdout, stderr) {
    if(err) throw err;
    process.stdout.write(stdout);
    process.stderr.write(stderr);
    var options = {
      cwd: workingDir
    };
    exec('git checkout ' + sha, options, function(err, stdout, stderr) {
      if(err) throw err;
      process.stdout.write(stdout);
      process.stderr.write(stderr);
      var item = require(workingDir);
    });
  });
};
