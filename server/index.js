// load in environment variables
require("dotenv").config()

const express = require("express")
const chalk = require("chalk")
const path = require("path")
const opn = require("opn")

const log = console.log
const env = process.env
const logNotify = chalk.bgKeyword("white").keyword("red")
const isProduction = "production" === process.env.NODE_ENV
const errorNotify = chalk.bgYellow.red

const products = require('../data/products/products.json')

const app = express()

app.set("etag", isProduction)

// Catch errors
app.use(function (err, req, res, next) {
  console.error(errorNotify(err.stack))
  res.status(500).send('Something broke!')
})

app.get("/", (req, res) => {
  res.sendFile('pages/index.html', { root: __dirname })
})

app.get('/products', (req, res) => {
  res.status(200).send(products)
})

app.get("/search", (req, res) => {
  return res.send("search page")
})

// Let's listen on the imported PORT env variable
app.listen(env.PORT, () => {
  log(`Server's started on port ${env.PORT}`)
})

// Open a browser instance for convenience
// opn(`${env.LOCAL_HOST}:${env.PORT}`)

log(logNotify(`Let's get this party started...`))