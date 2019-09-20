const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;

const port = new SerialPort("/dev/ttyACM0", {
    baudRate: 9600
});

const parser = new Readline
port.pipe(parser);
parser.on("data", (data) => console.log(data));

// port.on('readable', function () {
//     console.log(port.read().toString());
// });

port.on('error', function (err) {
    console.log('Error: ', err.message);
});

