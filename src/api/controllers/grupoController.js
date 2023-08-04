const grupoDB = require('../models/grupoModel');

registrarGrupo = async (req, res) => {
	const grupoData = req.body;

	try {
		await grupoDB.registraGrupo(grupoData);

		const response = {
			code: 200,
			mensaje: 'Grupo agregado correctamente',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

registrarUsuario = async (req, res) => {
	const data = req.body;

	try {
		await grupoDB.registraUsuario(data);

		const response = {
			code: 200,
			mensaje: 'Usuario insertado correctamente',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

eliminarUsuario = async (req, res) => {
	const data = req.body;

	try {
		await grupoDB.eliminaUsuario(data);

		const response = {
			code: 200,
			mensaje: 'Usuario eliminado correctamente del grupo',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

listarGruposPorUsuario = async (req, res) => {
	const data = req.body;
	try {
		let rowsGrupos = await grupoDB.getGruposPorUsuario(data);

		const response = {
			code: 200,
			mensaje: 'Grupos listados correctamente',
			data: rowsGrupos,
		};

		return res.status(200).json(response);
	} catch (err) {
		console.log(err);
		return;
	}
};

listarGruposPorCurso = async (req, res) => {
	/*RECOGEMOS LA data del body ENVIADA DEL FRONT Y LO ALMACENAMOS EN CONSTANTE grupoData*/
	const grupoData = req.body;
	try {
		let grupos = await grupoDB.getGruposPorCurso(grupoData);

		/*ARMAMOS UN OBJETO LLAMADO response CON EL FORMATO PARA DEVOLVER EL RESULTADO DE LA CONSULTA*/
		const response = {
			code: 200,
			mensaje: 'Grupos listados correctamente',
			data: grupos,
		};
		/*DEVOLVEMOS AL FRONT EL OBJETO CON EL FORMATO ADECUADO Y LA DATA SOLICITADA*/
		return res.status(200).json(response);
	} catch (err) {
		console.log(err);
		return;
	}
};

actualizarGrupo = async (req, res) => {
	const grupoData = req.body;

	try {
		await grupoDB.actualizaGrupo(grupoData);

		const response = {
			code: 200,
			mensaje: 'Grupo actualizado correctamente',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

eliminarGrupo = async (req, res) => {
	const grupoData = req.body;

	try {
		await grupoDB.eliminaGrupo(grupoData);

		const response = {
			code: 200,
			mensaje: 'Grupo eliminado correctamente',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	listarGruposPorCurso,
	listarGruposPorUsuario,
	registrarGrupo,
	actualizarGrupo,
	eliminarGrupo,
	registrarUsuario,
	eliminarUsuario,
};
