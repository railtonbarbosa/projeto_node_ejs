const express = require('express')
const app = express()

/* estamos dizendo para o express usar o EJS  como view engine */
app.set('view engine', 'ejs')
/* aqui estamos dizendo para nossa aplicação que iremos usar arquivos estaticos que estarão na pasta public */
app.use(express.static('public'))

app.get('/:nome/:lang', (req, res) => {
  var nome = req.params.nome
  var lang = req.params.lang
  var erro = false
  var produtos = [
    { nome: 'doritos', preco: 3.15 },
    { nome: 'coca-cola', preco: 5 },
    { nome: 'leite', preco: 6 }
  ]
  res.render('index', {
    nome: nome,
    lang: lang,
    enpresa: 'natfruit',
    inscritos: 8000,
    msg: erro,
    produtos: produtos
  })
})

app.listen(3000, () => {
  console.log('app rodando com sucesso')
})
