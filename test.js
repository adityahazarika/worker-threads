const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
let path = require('path');
const dirPath = path.join(__dirname, '/threads/thread.js');

const worker = new Worker(dirPath);
worker.once('message', (message) => {
    console.log(message);  // Prints 'Hello, world!'.
});
worker.postMessage('Hello, world!');