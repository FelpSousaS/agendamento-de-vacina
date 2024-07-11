import {Router} from 'express';
import AgendamentoController from '../controllers/agendamentoController.mjs';

const routes = Router();

const agendamentoController = new AgendamentoController();

routes.get('/api/agendamentos',(request, response) => agendamentoController.findAll(request,response));
routes.get('/api/agendamentos/:id',(request, response) => agendamentoController.findOne(request,response));
routes.post('/api/agendamentos',(request, response) => agendamentoController.save(request,response));
routes.put('/api/agendamentos/:id',(request, response) => agendamentoController.update(request,response));
routes.delete('/api/agendamentos/:id',(request, response) => agendamentoController.delete(request,response));

export default routes;