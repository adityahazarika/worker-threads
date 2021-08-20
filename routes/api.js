'use strict';
var router = require('express').Router();
const axios = require('axios').default;
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
let path = require('path');
const dirPath = path.join(__dirname, '/threads/calculate.js');

var fs = require("fs");

router.get("/", (req, res) => {
    res.status(200).json({
        "msg": "Hello World"
    })
}).post("/", (req, res) => {
    res.send(req.body);
})

function write(data, cb) {
    var writerStream = fs.createWriteStream('output.txt')
    var stream = writerStream.write(data);
    console.log(!stream);
    if (stream == false) {
        console.log("stream", stream)
        writerStream.once('drain', cb);
    } else {
        console.log("true");
        process.nextTick(cb);
    }
}

router.get('/ext-api', async (req, res) => {
    try {
        setTimeout(async () => {
            var data = await axios.get('http://api.plos.org/search?q=title:DNA');
            write(JSON.stringify(data.data), () => {
                console.log('Write completed, do more writes now.');
                console.log("response");
                res.status(200).json(data.data);
            });
        }, 10000);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

router.get('/:n', function (req, res) {
    let n = parseInt(req.params.n);
    let count = 0;

    if (n > 10000000000) n = 10000000000;

    for (let i = 0; i <= n; i++) {
        count += i;
    }

    res.send(`Final count is ${count}`);
})


router.get('/thread/:n', async function (req, res) {
    const worker = new Worker(dirPath,{
        workerData: req.params.n
      });
    worker.once('message', (message) => {
        console.log(message);  // Prints 'Hello, world!'.
    });
    res.send("You CPU Intensive task is proccessing in background");
})

module.exports = router;