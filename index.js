const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const checkMiddleware = (req, res, next) => {
  if (!req.query.idade) return res.redirect('/')
  next()
}

app.get('/', (req, res) => {
  return res.render('ageForm')
})

app.post('/check', (req, res) => {
  const { idade } = req.body
  if (idade > 18) return res.redirect(`/major?idade=${idade}`)
  return res.redirect(`minor?idade=${idade}`)
})

app.get('/major', checkMiddleware, (req, res) => {
  return res.render('major', { idade: req.query.idade })
})

app.get('/minor', checkMiddleware, (req, res) => {
  return res.render('minor', { idade: req.query.idade })
})

app.listen(3000)
