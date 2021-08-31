const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');

// use ejs as template engine
app.set('view engine', 'ejs');

// change the location of the views folder
app.set('views', path.join(__dirname, 'views'));

// use public folder
app.use(express.static('public'));

// enable req.body
app.use(express.urlencoded({ extended: true }));

// routes
app.use(routes);

app.listen(3000, () => {
  console.log('> [app] Running on http://localhost:3000');
});
