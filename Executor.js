var Events = require('events'), 
    util = require('util');
/** 
 * Author: Mark Schmale
 */
module.exports = Executor = function(func) {
    Events.EventEmitter.call(this); 
    this.func = func;
    this.queue = [];
    this.running = 0;

    this.on('job_queue_started', function() { this.running++; });
    
    this.on('job_queue_ready', function() {
        this.running--;
        if(this.running <= 0) {
            this.running = 0;
            this.emit('all_queues_ready');
        }
    });

    this.on('job_done', function() {
        this.execute();
    });
}
util.inherits(Executor, Events.EventEmitter);

Executor.prototype.push = function(value) {
    this.queue.unshift(value);
    return this;
}

Executor.prototype.pop = function() {
    return this.queue.pop();
}

Executor.prototype.startExecution = function(cnt) {
    for(var i=0;i<cnt;i++) {
        this.emit('job_queue_started');
        this.execute(); 
    }
}

Executor.prototype.execute = function() {
    if(this.queue.length >= 1) {
        var args = this.pop();
        this.func.apply(this, args);
    } else {
        this.emit('job_queue_ready');
    }
}

