const SerialPort = require("serialport");
let Disruptor = require('shared-memory-disruptor').Disruptor;
let disruptor = new Disruptor('/example', 100, 15, 1, -1, true, true);

module.exports.produce = () => {

    const Readline = SerialPort.parsers.Readline;
    const port = new SerialPort("/dev/ttyACM0", {
        baudRate: 9600
    });
    const parser = new Readline
    port.pipe(parser);
    parser.on("data", async (data) => {
        console.log(data)
        let buf = await disruptor.produceClaimSync();
        buf.write(data);
        await disruptor.produceCommitSync();
    });

    // port.on('readable', function () {
    //     console.log(port.read().toString());
    // });

    port.on('error', function (err) {
        console.log('Error: ', err.message);
    });

};

// var data = "Hello World";
// var i = 0;
// while (i < 1000) {
//     console.log(data + " " + i)
//     let buf = await disruptor.produceClaimSync();
//     bytes = buf.write(data, 0, 11);
//     console.log(bytes);
//     await disruptor.produceCommitSync();
//     i += 1;
// }