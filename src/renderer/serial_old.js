// -----------------------------------------------------
// serial parsing
// -----------------------------------------------------

import SerialPort from "serialport";
import ByteLength from '@serialport/parser-byte-length'
// const serialPorts = []
let teensyPort

SerialPort.list().then(ports => {
    ports.forEach(port => {
        if (port.manufacturer ===
            "Arduino (www.arduino.cc)") {
            const temp = new SerialPort(port.comName, {
                baudRate: 115200,
                lock: true
            })

            temp.pipe(new ByteLength({
                length: 6
            }))

            temp.on('data', line => {
                console.log('>>>>', parseBuffer(line))
            })

            teensyPort = temp
        }
    })
})

const parseBuffer = buff => {
    if (buff.length != 6) return -1

    let message = '\n'

    if ((buff[0] & 0x80) == 0x80) {

        message += 'address: ' + (buff[0] & 0x7F) + '\n'
        message += 'event: ' + ((buff[1] & 0x30) >> 4) + '\n'

        const data = buff.slice(2, 5)
        const buf = new ArrayBuffer(4);
        const view = new DataView(buf);

        view.setUint8(0, (((buff[1] & 0x0F) << 4) | ((buff[2] & 0x78) >> 3)))
        view.setUint8(1, (((buff[2] & 0x07) << 5) | ((buff[3] & 0x7C)) >> 2))
        view.setUint8(2, (((buff[3] & 0x03) << 6) | ((buff[4] & 0x7E) >> 1)))
        view.setUint8(3, (((buff[4] & 0x01) << 7) | (buff[5] & 0x7F)))

        let num = view.getFloat32(0);
        message += 'value: ' + num + '\n'
        num = view.getFloat32(0);

    } else {
        return -2; // Bad header
    }

    return message
}