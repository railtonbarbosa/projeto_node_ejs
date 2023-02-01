const express = require('express')
const app = express()
/* comando usado para decodificar os dados enviados pelo formulario e envialos */
const bodyParser = require('body-parser')

/* estamos dizendo para o express usar o EJS  como view engine */
app.set('view engine', 'ejs')
/* aqui estamos dizendo para nossa aplicação que iremos usar arquivos estaticos que estarão na pasta public */
app.use(express.static('public'))

/* comando usado para decodificar os dados enviados pelo formulario e envialos */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* conectando com banco de dados  */
const connection = require('./database/database.js')
/*uma representação da tabela que iremos criar no mysql, só que em arquivo js */
const Pergunta = require('./database/Pergunta')
/*uma representação das respostas da  tabela que iremos criar no mysql, só que em arquivo js */
const Resposta = require('./database/Resposta')

/* 
# aqui estamos usando a conexão com o db
# authenticate() será usado para fazer essa autenticação, caso der tudo certo iremos entrar no then caso der errado iremos entrar no catch
*/
connection
  .authenticate()
  .then(() => {
    console.log('conexão feita com o banco de dados ')
  })
  .catch(msgErro => {
    console.log(msgErro)
  })

/*requisição feita para listar as perguntas na pagina principal 
# estamos indo no nosso model de pergunta. e usando o findAll({ raw: true, order: [['id', 'desc']] }) que serve para procurar e retornar todas as listas de perguntas somente com os dados nesseçarios,{ raw: true, order: [['id', 'desc']] } usado para trazer esses dados na orden que queremos usalos na nossa aplicação.
*/
app.get('/', (req, res) => {
  Pergunta.findAll({ raw: true, order: [['id', 'desc']] }).then(perguntas => {
    /* variavel "PERGUNTAS" usado para receber os dados da lista de perguntas */
    res.render('index', {
      /* pega a variavel com os dados e usando o render joga para o frontend */
      perguntas: perguntas
    })
  })
})

/* requisição responsavel pela pagina PERGUNTAR.EJS   */
app.get('/perguntar', (req, res) => {
  res.render('perguntar')
  /* responsavel por renderizar a pagina perguntar.ejs */
})

/* requisição responsavel por trazer dados do formulario do arquivo perguntar.ejs   */
app.post('/salvarpergunta', (req, res) => {
  /* aqui estamos requisitando com variaveis os dados que estão vindo do nosso front e guardando para serem usados futuramente  */
  var titulo = req.body.titulo
  var descricao = req.body.descricao
  /* para criarmos uma tabela temos que pegar o model PERGUNTA  e usar com CREATE e depois usarmos a variaveis que estamos recebendo dados do nosso front para mandarmos para nosso db */
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    /* quando a pergunta for salva no nosso db iremos redirecionar para a pagina inicia com os seguintes comandos  */
    res.redirect('/')
  })
})

app.get('/pergunta/:id', (req, res) => {
  var id = req.params.id
  Pergunta.findOne({
    where: { id: id }
  }).then(pergunta => {
    if (pergunta != undefined) {
      // Pergunta encontrada

      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order: [['id', 'DESC']]
      }).then(respostas => {
        res.render('pergunta', {
          pergunta: pergunta,
          respostas: respostas
        })
      })
    } else {
      // Não encontrada
      res.redirect('/')
    }
  })
})

app.post('/responder', (req, res) => {
  var corpo = req.body.corpo
  var perguntaId = req.body.pergunta
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect('/pergunta/' + perguntaId)
  })
})

app.listen(3000, () => {
  console.log('app rodando com sucesso')
})
