const SerialPort = require("serialport");
let Disruptor = require('shared-memory-disruptor').Disruptor;
let disruptor = new Disruptor('/example', 100, 11, 1, -1, true, true);

module.exports = function (produce) {

    const Readline = SerialPort.parsers.Readline;
    const port = new SerialPort("/dev/ttyACM0", {
        baudRate: 9600
    });
    const parser = new Readline
    port.pipe(parser);
    parser.on("data", (data) => {
        console.log(data)
        let buf = disruptor.produceClaimSync();
        buf.write(data);
        disruptor.produceCommitSync();
    });

    // port.on('readable', function () {
    //     console.log(port.read().toString());
    // });

    port.on('error', function (err) {
        console.log('Error: ', err.message);
    });
};

