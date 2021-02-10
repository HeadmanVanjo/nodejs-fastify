const fastify = require('fastify')({ logger: true })

// fastify.listen(3000, '127.0.0.1', function (err, address) {
//     if (err) {
//         fastify.log.error(err)
//         process.exit(1)
//     }
//     console.log(`server listening on ${address}`)
// })

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    console.log(err)
    fastify.log.error(err)
  }
}

start()
