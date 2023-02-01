const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'root', '98092458', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection
