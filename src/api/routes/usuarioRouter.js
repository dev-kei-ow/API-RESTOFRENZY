const express = require('express');
const usuarioRouter = express.Router();
const usuarioController = require('../controllers/usuarioController');

usuarioRouter.post('/login', usuarioController.loginUsuario);
usuarioRouter.get('/listar', usuarioController.listarUsuarios);
usuarioRouter.post('/crear', usuarioController.registrarUsuario);
usuarioRouter.post('/buscar_by_id', usuarioController.buscarPorIdUsuario);
usuarioRouter.post('/usuarios_by_grupo', usuarioController.listarUsuariosPorGrupo);
usuarioRouter.post('/countUsu_by_grupo', usuarioController.listarCountUsuariosPorGrupo);
usuarioRouter.put('/actualizar', usuarioController.actualizarUsuario);
usuarioRouter.put('/eliminar', usuarioController.eliminarUsuario);

module.exports = usuarioRouter;
