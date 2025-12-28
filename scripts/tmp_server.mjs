import { createServer } from "http";


createServer((req, res) => {
    
    res.writeHead(200, 'OK', {
        // 'Content-Type': 'text/plain',
        // 'Transfer-Encoding': 'chunked',
        'Content-Type': 'text/html',

    })
    let i = 0;
    setInterval(() => {
        i++;
        res.write('aaaaaaaaaaaaaaaaaxx' + i)
    }, 1000);

}).listen(7702)