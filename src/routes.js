const express = require('express');
const routes = express.Router();

const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboardController');

routes.get('/', DashboardController.index);

routes.get('/job', (req, res) => res.render('job'));
routes.post('/job', JobController.save);

routes.get('/job/edit', (req, res) => res.redirect('/'));
routes.get('/job/edit/:id', JobController.getById);
routes.post('/job/edit/:id', JobController.update);

routes.post('/job/delete/:id', JobController.delete);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

module.exports = routes;
