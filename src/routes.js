const express = require('express');
const routes = express.Router();

const viewsPath = __dirname + '/views';

routes.get('/', (req, res) => res.sendFile(viewsPath + '/index.html'));

routes.get('/job', (req, res) => res.sendFile(viewsPath + '/job.html'));

routes.get('/job/edit', (req, res) => res.sendFile(viewsPath + '/job-edit.html'));

routes.get('/profile', (req, res) => res.sendFile(viewsPath + '/profile.html'));

module.exports = routes;
