const express = require('express');
const cursoRouter = express.Router();
const cursoController = require('../controllers/cursoController');

cursoRouter.get('/listar', cursoController.listarCursos);
cursoRouter.post('/crear', cursoController.registrarCurso);
cursoRouter.post('/cursos_by_usu', cursoController.listarCursosPorUsuario);
cursoRouter.post('/admin_by_curso', cursoController.listarAdminPorCurso);
cursoRouter.put('/actualizar', cursoController.actualizarCurso);
cursoRouter.delete('/eliminar', cursoController.eliminarCurso);

module.exports = cursoRouter;
