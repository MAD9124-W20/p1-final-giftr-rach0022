const config = require('config')
const logger = require('./logger')
const mongoose = require('mongoose')

module.exports = () => {
  const {scheme, host, port, name, username, password, authSource} = config.get('db')
  const credentials = username && password ? `${username}:${password}@` : ''

  let connectionString = `${scheme}://${credentials}${host}`

  if (scheme === 'mongodb') {
    connectionString += `:${port}/${name}?authSource=${authSource}`
  } else {
    connectionString += `/${authSource}?retryWrites=true&w=majority`
  }
  logger.log('info', connectionString);

  mongoose
    .connect(
      connectionString,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        dbName: name
      }
    )
    .then(() => {
      logger.log('info', `Connected to MongoDB @ ${name}...`)
    })
    .catch(err => {
      logger.log('error', `Error connecting to MongoDB ...`, err)
      process.exit(1)
    })
}
