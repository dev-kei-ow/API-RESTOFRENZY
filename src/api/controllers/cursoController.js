const cursoDB = require('../models/cursoModel');
const { v4: uuidv4 } = require('uuid');

listarCursos = async (req, res) => {
	try {
		let rowsCursos = await cursoDB.consultaCursos();

		const response = {
			code: 200,
			mensaje: 'Cursos listados correctamente',
			data: rowsCursos,
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

registrarCurso = async (req, res) => {
	const cursoData = req.body;
	const id = uuidv4();
	try {
		await cursoDB.registraCurso(cursoData,id);

		const response = {
			code: 200,
			mensaje: 'Curso agregado correctamente',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

listarCursosPorUsuario = async (req, res) => {
	const { idUsu } = req.body;
	try {
		let arregloCursosConNombreCat = await cursoDB.getCursosPorUsuario(idUsu);

		const response = {
			code: 200,
			mensaje: 'Acceso verificado y aceptado',
			data: arregloCursosConNombreCat,
		};
		return res.status(200).json(response);
	} catch (err) {
		console.log(err);
		return;
	}
};

listarAdminPorCurso = async (req, res) => {
	//Recogemos la data enviada del front y lo almacenamos en la constante data
	const cursoData = req.body;
	try {
		let rowsAdminCurso = await cursoDB.getAdminPorCurso(cursoData);

		//Armamos un objeto llamado response con el formato para devolver el resultado de la consulta
		const response = {
			code: 200,
			mensaje: 'Datos de admins listados correctamente',
			data: rowsAdminCurso,
		};

		//devolvemos al front el objeto con el formato adecuado y la data solicitada
		return res.status(200).json(response);
	} catch (err) {
		console.log(err);
		return;
	}
};

actualizarCurso = async (req, res) => {
	const cursoData = req.body;

	try {
		await cursoDB.actualizaCurso(cursoData);

		const response = {
			code: 200,
			mensaje: 'Curso actualizado correctamente',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

eliminarCurso = async (req, res) => {
	const cursoData = req.body;

	try {
		await cursoDB.eliminaCurso(cursoData);

		const response = {
			code: 200,
			mensaje: 'Curso eliminado correctamente',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	listarCursos,
	registrarCurso,
	listarCursosPorUsuario,
	actualizarCurso,
	eliminarCurso,
	listarAdminPorCurso,
};
