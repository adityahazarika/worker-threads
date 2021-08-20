'use strict';
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

    if (isMainThread) {
        console.log(2)
        const worker = new Worker(__filename);
        worker.once('message', (message) => {
          console.log(message);  // Prints 'Hello, world!'.
        });
        worker.postMessage('Hello, world!');
      } else {
          console.log(3)
        // When a message from the parent thread is received, send it back:
        parentPort.once('message', (message) => {
          parentPort.postMessage("Ek number bhai");
        });
      }
