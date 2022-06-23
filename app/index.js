const express = require('express')
const proxy = require('express-http-proxy')
const bodyParser = require('body-parser')
const path = require('path')
const flash = require('connect-flash')
const app = express()
const {checkLogin} = require('./auth')
const session = require('express-session')
// const sqlite = require('better-sqlite3')
const nunjucks = require('nunjucks')
// const SqliteStore = require('better-sqlite3-session-store')(session)
// const db = new sqlite("sessions.db");
const {storyBaseUrl, routePrefix, proxyPrefix, fetchPrefix, fetchUrl} = require('config')

global.isProd = process.env.NODE_ENV === 'production'

const resolve = dir => path.resolve(__dirname, dir)
app.set("view engine", "html")
app.set('views',path.resolve('./views'));
app.enable('trust proxy')
app.disable('x-powered-by')

let env = nunjucks.configure(resolve(`./views`), {
  autoescape: true,
  watch: true,
  express: app
})

env.addFilter('tojson', function(obj) {
  return JSON.stringify(obj)
})


if(!isProd){
  app.use(`${fetchPrefix}`, proxy(fetchUrl))
}

app.use(`${proxyPrefix}`, checkLogin, proxy(storyBaseUrl))
app.use(bodyParser.urlencoded({extended: true}))
app.use("/amc-storyline-auth",express.static(resolve('../node_modules')))
app.use("/amc-storyline-auth",express.static(resolve('./public')))
app.use(express.static(resolve('./public')))

app.use(
  session({
    resave: true,
    secret: "droden", 
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
    },
    saveUninitialized: true, // 保存未初始化的session,不管客户端用不用,都初始化个session让你用
    // store:new SqliteStore({
    //   client: db, 
    //   expired: {
    //     clear: true,
    //     intervalMs: 900000 //ms = 15min
    //   }
    // })
  })
);
app.use(flash())

app.use(function (req,res,next) {
  //真正渲染模板的是res.locals
  res.locals.user = "droden222";
  res.locals.keyword = '';
  //flash的功能是读完一次之后会立刻清空数据
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

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
