//const { parentPort } = require('worker_threads');
const Disruptor = require('shared-memory-disruptor').Disruptor;

const disruptor = new Disruptor('/example', 1000, 11, 1, 0, false, true);

async function test() {
    try {
        var i = 0;
        console.log("===============\n");
        while (i < 100) {
            console.log("waiting");
            const { bufs } = await disruptor.consumeNew();
            console.log("consumed");
            for (let buf of bufs) {
                for (let j = 0; j < buf.length; j += 15) {
                    console.log(buf.slice(0,11).toString() + " " + i + "\n");
                    i += 1;
                }
            }
            disruptor.consumeCommit();
        }
    } catch (error) {
        console.log("====> " + error.toString());
    }
}

test();

//parentPort.postMessage("I am finito");
//d.release();

