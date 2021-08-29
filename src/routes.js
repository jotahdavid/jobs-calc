const express = require('express');
const routes = express.Router();

const viewsPath = __dirname + '/views/';

routes.get('/', (req, res) => res.render(viewsPath + 'index'));

routes.get('/job', (req, res) => res.render(viewsPath + 'job'));

routes.get('/job/edit', (req, res) => res.render(viewsPath + 'job-edit'));

routes.get('/profile', (req, res) => res.render(viewsPath + 'profile'));

module.exports = routes;
