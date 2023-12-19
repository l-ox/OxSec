// Modules
const url = require('url');
const http = require('http');
const fs = require('fs');

// Definitions and Variables
const host = '127.0.0.1';
const port = 80;
var keys = ["5jEByz2Igr", "m9qd1PvdW8"];

const requestListener = function (req, res) {
    var requestBody = "";
    req.on('data', (chunk) => {
        requestBody += chunk;
    });
    path = req.url
    uri = ("http://" + host + ":" + port + path);
    uri = new URL(uri);
    const search_params = uri.searchParams;
    const key = search_params.get('api_key');
    const id = search_params.get('id');
    if (keys.includes(key)) {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(`{"message": "200 OK - Roger"}`);
    }
    else {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(401);
        res.end(`{"message": "401 Unauthorised"}`);
    }
    req.on('end', () => {
        jsonLog = ('{"id": "' + id + '", "log_value": "' + requestBody + '"}')
        fs.appendFile('1.txt', jsonLog + '\r\n', (err) => {
            if (err) throw err;
        });
    });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});