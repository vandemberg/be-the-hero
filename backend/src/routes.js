const express = require('express');
const routes = express.Router();

const OngsController = require('./controllers/OngsController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionsController = require('./controllers/SessionsController');

routes.get('/', (_request, response) => {
  return response.json({
    evento: 'Semana OmniStack 11.0',
    aluno: 'Vandemberg Lima',
  })
});

routes.get('/ongs', OngsController.index);
routes.post('/ongs', OngsController.store);

routes.post('/incidents', IncidentsController.store);
routes.get('/incidents', IncidentsController.index);
routes.delete('/incidents/:id', IncidentsController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionsController.store);

module.exports = routes;
