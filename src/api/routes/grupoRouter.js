const express = require('express');
const grupoRouter = express.Router();
const grupoController = require('../controllers/grupoController');

grupoRouter.post('/crear', grupoController.registrarGrupo);
grupoRouter.post('/insertUser', grupoController.registrarUsuario);
grupoRouter.post('/deleteUser', grupoController.eliminarUsuario);
grupoRouter.post('/grupos_by_curso', grupoController.listarGruposPorCurso);
grupoRouter.post('/grupos_by_usuario', grupoController.listarGruposPorUsuario);
grupoRouter.put('/actualizar', grupoController.actualizarGrupo);
grupoRouter.delete('/eliminar', grupoController.eliminarGrupo);

module.exports = grupoRouter;
