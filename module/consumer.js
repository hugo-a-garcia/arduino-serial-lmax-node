const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');
let Disruptor = require('shared-memory-disruptor').Disruptor;

let disruptor = new Disruptor('/example', 100, 11, 1, 0, false, true);

console.log("Consumer")

let bufs = disruptor.consumeNewSync();

console.log(Buffer.byteLength("Hello World", 'utf8'));

    for (let buf of bufs) {
        for (let j = 0; j < buf.length; j += 11) {
            console.log(buf.length);
            console.log(buf.toString());
        }
    }
    disruptor.consumeCommit();


//parentPort.postMessage(sum);//sshare memory here.
//d.release();

