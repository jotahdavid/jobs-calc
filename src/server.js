const express = require('express');
const app = express();
const routes = require('./routes');

// use ejs as template engine
app.set('view engine', 'ejs');

// use public folder
app.use(express.static('public'));

// routes
app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
