//  'use strict';

const {
    Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

const produce = require('./producer.js');

var args = require('minimist')(process.argv.slice(2));

if (args.p == true) {
    console.log("WOW ");

    produce();


    // const worker = new Worker("./producer.js", {});
    // worker.on('exit', (code) => {
    //     console.log("PRODUCER EXIT");
    //     if (code !== 0)
    //       new Error(`Worker stopped with exit code ${code}`);
    //   });
    // worker.on("message", msg => {
    //     console.log(msg);
    //     //worker.terminate();
    // });
    // worker.on('error', () => {console.log("oops producer")});
}

if (args.c == true) {
    console.log("Woot " + args.c);
    const worker = new Worker("./consumer.js", {});
    worker.on('exit', (code) => {
        console.log("CONSUMER EXIT");
        if (code !== 0)
          new Error(`Worker stopped with exit code ${code}`);
      });
    worker.on("message", msg => {
        console.log(msg);
        //worker.terminate();
    });
    worker.on('error', () => {console.log("oops consumer")});
}


