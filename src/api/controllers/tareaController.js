const tareaDB = require('../models/tareaModel');

registrarTarea = async (req, res) => {
	const tareaData = req.body;

	try {
		await tareaDB.registraTarea(tareaData);

		const response = {
			code: 200,
			mensaje: 'Tarea agregada correctamente',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

actualizarTarea = async (req, res) => {
	const tareaData = req.body;

	try {
		await tareaDB.actualizaTarea(tareaData);

		const response = {
			code: 200,
			mensaje: 'Tarea actualizada correctamente',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

eliminarTarea = async (req, res) => {
	const tareaData = req.body;

	try {
		await tareaDB.eliminaTarea(tareaData);

		const response = {
			code: 200,
			mensaje: 'Tarea eliminada correctamente',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	registrarTarea,
	actualizarTarea,
	eliminarTarea,
};
