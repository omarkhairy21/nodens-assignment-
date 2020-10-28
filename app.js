const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const app = express();
const csrfProtection = csrf({
  cookie: true,
});
// middleware
// serve static sites
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(csrfProtection);

// view engine
app.set('view engine', 'pug');

// views
app.set('views', 'views');

// database connection

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('Database Connected Successfully');
  })
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// routes
app.get('/', (req, res) => res.render('home'));
app.use(authRoutes);
app.use(userRoutes);

module.exports = app;
