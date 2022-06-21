const express = require('express')
const proxy = require('express-http-proxy')
const bodyParser = require('body-parser')
const path = require('path')
const flash = require('connect-flash')
const app = express()
const session = require('express-session')
const sqlite = require('better-sqlite3')
const nunjucks = require('nunjucks')
const SqliteStore = require('better-sqlite3-session-store')(session)

const db = new sqlite("sessions.db", { verbose: console.log });
const {storyBaseUrl, routePrefix, proxyPrefix} = require('config')



const resolve = dir => path.resolve(__dirname, dir)
app.set("view engine", "html")
app.enable('trust proxy')
app.disable('x-powered-by')

app.use(`${proxyPrefix}`, proxy(storyBaseUrl))
app.use(express.static(resolve('../node_modules')))
app.use(express.static(resolve('./public')))
app.use(express.static(resolve('./views/user')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(
  session({
    resave: true,
    secret: "droden", 
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
    },
    saveUninitialized: true, // 保存未初始化的session,不管客户端用不用,都初始化个session让你用
    store:new SqliteStore({
      client: db, 
      expired: {
        clear: true,
        intervalMs: 900000 //ms = 15min
      }
    })
  })
);

let env = nunjucks.configure(resolve(`./views`), {
  autoescape: true,
  watch: true,
  express: app
})
env.addFilter('tojson', function(obj) {
return JSON.stringify(obj)
})

app.use(flash())

app.get(`/ping`, (req, res, next) =>{
  res.end('storyLine server ready')
});

app.get('/', (req, res, next) =>{
  res.render('user/login', {title: '登陆'})
})

const user = require('./router/user')
app.use(`${routePrefix}/user`, user)

const PORT = 5001
app.listen(PORT, function () {
  console.log(`server running at ${PORT}`)
})
