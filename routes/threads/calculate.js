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
        let n = workerData;
        let count = 0;
    
        if (n > 10000000000) n = 10000000000;
    
        for (let i = 0; i <= n; i++) {
            count += i;
        }   
          parentPort.postMessage(count);
      }
