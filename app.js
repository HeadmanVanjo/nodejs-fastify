require('dotenv').config()

// const chalk = require('chalk')
const compression = require('compression')
// const cors = require('cors')
const fastify = require('fastify')({ logger: true })
// const helmet = require('helmet')
const mongoose = require('mongoose')
// const logger = require('morgan')
// const app = fastify();

// app.use(helmet());
// fastify.register(helmet());
// app.use(compression());
fastify.register(compression())
// app.use(morgan("dev"));
// fastify.register(logger("combined"))

/** connecting to database */
try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
    .then((res) => {
      console.log('Database connected succesfully')
    })
    .catch((err) => {
      console.log(err)
    })
} catch (err) {
  console.log(err)
}

// const usersRoutes = require("./routes/users.routes");

// registering routes
// fastify.register("/api/user", usersRoutes);
// fastify.register(require('./routes/users.routes'))
// fastify.register(require('./plugin/routes'))

// testing activity
// fastify.get("/", (request, rep) => {
//     rep.json("Hello This route is working");
// })

// migrations
const { User } = require('./models/User.model')

// API ROUTES
/* /api/usersGET */
fastify.get('/api/users', async (request, reply) => {
  await User.find({}, (err, users) => {
    if (!err) {
      reply.json(users)
    } else {
      reply.json({ error: err })
    }
  })
})

/* api/users/:userId GET */
fastify.get('/api/users/:userId', async (request, reply) => {
  const userId = request.params.userId
  await User.findById(userId, (err, user) => {
    if (!err) {
      reply.json(user)
    } else {
      reply.json({ error: err })
    }
  })
})

/* /api/users POST */
fastify.post('/api/users', async (request, reply) => {
  const user = request.body
  await User.create(user, (err, user) => {
    if (!err) {
      reply.json(user)
    } else {
      reply.json({ error: err })
    }
  })
})

/* /api/users/:userId PUT */
fastify.put('/api/users/:userId', async (request, reply) => {
  const userId = request.params.userId
  const newUserEdit = request.body
  await User.findById(userId, (err, user) => {
    if (!err) {
      user.age = newUserEdit.age
      user.name = newUserEdit.name
      user.email = newUserEdit.email
      user.save((er, savedUser) => {
        if (!er) {
          reply.json(savedUser)
        } else {
          reply.json(er)
        }
      })
    } else {
      reply.json({ error: err })
    }
  })
})

/* /api/user/:userId DELETE */
fastify.put('/api/users/:userId', async (request, reply) => {
  const userId = request.params.userId
  await User.findById(userId, (err, user) => {
    if (!err) {
      user.remove((er) => {
        if (!er) {
          reply.json('USER DELETED')
        } else {
          reply.json({ error: er })
        }
      })
    } else {
      reply.json({ error: err })
    }
  })
})

/* /api/user/:userId DELETE */

// app.listen()
require('./config/server')
// fastify.listen(3000, '127.0.0.1', function (err, address) {
//     if (err) {
//         fastify.log.error(err)
//         process.exit(1)
//     }
//     console.log(`server listening on ${address}`)
// })
