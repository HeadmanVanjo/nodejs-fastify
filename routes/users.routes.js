// const fastify = require("fastify");
// const router = fastify.default();
const { User } = require('../models/User.model')

// destructuring
// const { usersGET } = require("../controllers/users.controller");

async function routes (fastify, options, done) {
  fastify.get('/', async (req, res) => {
    await User.find({}, (err, users) => {
      if (!err) {
        res.send(users)
      } else {
        res.send({ error: err })
      }
    })
  })
  done()
}
// router.get("/", usersGET);

module.export = routes
