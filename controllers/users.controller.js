const { User } = require('../models/User.model')

module.exports = {
  usersGET: async (req, rep) => {
    User.find({}, (err, users) => {
      if (!err) {
        rep.send(users)
      } else {
        rep.send({ error: err })
      }
    })
  }
}
