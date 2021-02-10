require("dotenv").config();

const chalk = require("chalk");
const compression = require("compression");
const cors = require("cors");
const fastify = require('fastify')({ logger: true });
const helmet = require("helmet");
const mongoose = require("mongoose")
const logger = require("morgan");
// const app = fastify();

// app.use(helmet());
// fastify.register(helmet());
// app.use(compression());
fastify.register(compression());
// app.use(morgan("dev"));
// fastify.register(logger("combined"))

// testing activity
fastify.get("/", (request, rep) => {
    rep.send("Hello This route is working");
})

// app.listen()
require("./config/server")
// fastify.listen(3000, '127.0.0.1', function (err, address) {
//     if (err) {
//         fastify.log.error(err)
//         process.exit(1)
//     }
//     console.log(`server listening on ${address}`)
// })


