const express = require("express");
const app = express();
const api = require("./routes/api");

// const cluster = require('cluster');
// const totalCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//     console.log(`Number of CPUs is ${totalCPUs}`);
//     console.log(`Master ${process.pid} is running`);

//     for (let i = 0; i < totalCPUs; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//         console.log("Let's fork another worker!");
//         cluster.fork();
//     });

// } else {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api", api);

    app.listen(3000, () => console.log("listening on port 3000"))

// }