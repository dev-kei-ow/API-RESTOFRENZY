const express = require('express');
const tareaRouter = express.Router();
const tareaController = require('../controllers/tareaController');

tareaRouter.post('/crear', tareaController.registrarTarea);
tareaRouter.put('/actualizar', tareaController.actualizarTarea);
tareaRouter.delete('/eliminar', tareaController.eliminarTarea);

module.exports = tareaRouter;
