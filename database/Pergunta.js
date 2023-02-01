/* basicamente esse arquivo model é uma representação da tabela que iremos criar só que em arquivo js  */

const Sequelize = require('sequelize')
const connection = require('./database')
/* estamos conectando o db connection e estamos definindo o nome da tabela PERGUNTA  */
const Pergunta = connection.define('pergunta', {
  titulo: {
    type: Sequelize.TEXT,
    allowNull: false
    /* aqui estamos dizendo que o tipo do texto sera do tipo STRING e esse campo será obrigatorio o preenchimento */
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
    /* aqui estamos dizendo que o tipo do texto sera do tipo TEXTO e esse campo será obrigatorio o preenchimento */
  }
})

/* aqui iremos sincronizar com o db e iremos criar e se caso ja estiver não iremos substituir  */
Pergunta.sync({ force: false }).then(() => {})

module.exports = Pergunta
