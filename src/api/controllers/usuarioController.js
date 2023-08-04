const usuarioDB = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');

loginUsuario = async (req, res) => {
	const { correo, contraseña } = req.body;

	try {
		let rowLogin = await usuarioDB.login(correo, contraseña);

		if (rowLogin.length === 0) {
			const responseError = {
				code: 500,
				mensaje: 'No se encontraron coincidencias en la consulta',
			};
			return res.status(500).json(responseError);
		}

		const response = {
			accessToken: jwt.sign({ correo, contraseña }, 'secret', { expiresIn: '1h' }),
			code: 200,
			mensaje: 'Inicio de sesión exitoso',
			data: rowLogin[0],
		};

		return res.status(200).json(response);
	} catch (err) {
		const responseError = {
			code: 500,
			mensaje: err.sqlMessage,
			result: err,
		};
		res.status(500).json(responseError);
	}
};

listarUsuarios = async (req, res) => {
	try {
		let rowsUsuarios = await usuarioDB.consultaUsuarios();

		const response = {
			code: 200,
			mensaje: 'Usuarios listados correctamente',
			data: rowsUsuarios,
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

registrarUsuario = async (req, res) => {
	const userData = req.body;

	try {
		await usuarioDB.registraUsuario(userData);

		const response = {
			code: 200,
			mensaje: 'Usuario agregado correctamente',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

listarUsuariosPorGrupo = async (req, res) => {
	const data = req.body;
	try {
		let rowsUsuarios = await usuarioDB.getUsuariosPorGrupo(data);

		const response = {
			code: 200,
			mensaje: 'Usuarios listados correctamente',
			data: rowsUsuarios,
		};

		return res.status(200).json(response);
	} catch (err) {
		console.log(err);
		return;
	}
};

listarCountUsuariosPorGrupo = async (req, res) => {
	const data = req.body;
	try {
		let countUsuarios = await usuarioDB.getCountUsuariosPorGrupo(data);

		const response = {
			code: 200,
			mensaje: 'Usuarios contados correctamente',
			data: countUsuarios,
		};

		return res.status(200).json(response);
	} catch (err) {
		console.log(err);
		return;
	}
};

buscarPorIdUsuario = async (req, res) => {
	const userData = req.body;

	try {
		let rowUsuario = await usuarioDB.buscaPorIdUsuario(userData);

		const response = {
			code: 200,
			mensaje: 'Usuario listado correctamente',
			data: rowUsuario,
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

actualizarUsuario = async (req, res) => {
	const userData = req.body;

	try {
		await usuarioDB.actualizaUsuario(userData);

		const response = {
			code: 200,
			mensaje: 'Usuario Actualizado correctamente',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

eliminarUsuario = async (req, res) => {
	const userData = req.body;

	try {
		await usuarioDB.eliminaUsuario(userData);

		const response = {
			code: 200,
			mensaje: 'El campo activo cambio a número 2',
		};

		return res.status(200).json(response);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	loginUsuario,
	listarUsuarios,
	registrarUsuario,
	buscarPorIdUsuario,
	actualizarUsuario,
	eliminarUsuario,
	listarUsuariosPorGrupo,
	listarCountUsuariosPorGrupo,
};
