const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');
let Disruptor = require('shared-memory-disruptor').Disruptor;

let d = new Disruptor('/example', 1000, 4, 1, 0, false, true);

while (true) {
    let bufs = d.consumeNewSync();

    for (let buf of bufs) {
        for (let j = 0; j < buf.length; j++) {
            let sum = buf.toString();
            console.log(sum);
            //i += 1;
        }
    }

    d.consumeCommit();
}
//parentPort.postMessage(sum);//sshare memory here.
d.release();

