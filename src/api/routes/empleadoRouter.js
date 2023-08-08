const express = require('express');
const empleadoRouter = express.Router();
const empleadoController = require('../controllers/empleadoController');

empleadoRouter.post('/login', empleadoController.loginUsuario);
empleadoRouter.get('/listar', empleadoController.listarEmpleados);
empleadoRouter.post('/registrar', empleadoController.registrarEmpleado);
empleadoRouter.put('/actualizar', empleadoController.actualizarEmpleado);
empleadoRouter.post('/countUsu_by_grupo', empleadoController.listarCountUsuariosPorGrupo);
empleadoRouter.put('/eliminar', empleadoController.eliminarUsuario);

module.exports = empleadoRouter;
