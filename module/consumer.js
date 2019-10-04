const { parentPort} = require('worker_threads');
let Disruptor = require('shared-memory-disruptor').Disruptor;

let disruptor = new Disruptor('/example', 100, 11, 1, 0, false, true);

var text = "";
var i = 0;
do {
    text = i++;
    console.log(text);
    console.log("do");
    disruptor.consumeNew(() => {
        console.log("consume");
        var bufs = disruptor.consumeNewSync();
        for (let buf of bufs) {
            for (let j = 0; j < buf.length; j += 11) {
                console.log(buf.length);
                console.log(buf.toString());
            }
        }
        disruptor.consumeCommit();
    });
} while (i < 5);
console.log("El FIN");

parentPort.postMessage("I am finito");
//d.release();

