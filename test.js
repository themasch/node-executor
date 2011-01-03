var Executor = require('./Executor');

var f = function(val, timeout) {
    var self = this;
    console.log('waiting for ' + val + ' ');
    setTimeout(function() {
        console.log('GOT ' + val);
        self.emit('job_done');
    }, timeout);
}

var e = new Executor(f);
console.log(e.prototype);
e.push(['a', 200]);
e.push(['b', 1000]);
e.push(['c', 10]); 
e.push(['d', 100]);
e.push(['e', 200]);
e.push(['f', 1000]);
e.push(['g', 10]); 
e.push(['h', 100]);

e.on('all_queues_ready', function() { console.log('ALL_JOBS_DONE'); });
e.on('job_queue_ready', function() { console.log('JOB_QUEUE_DONE'); });
e.on('job_done', function() { console.log('JOB_DONE'); });

e.startExecution(4);

