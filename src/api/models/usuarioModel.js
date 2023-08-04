const mysqlConnectionSync = require('../../config/databaseSync');

login = async (correo, contraseña) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `SELECT idUsu,nombre,correo,tipoUsuario,idInstituto,telefono,fechaCreacion,fechaEliminacion,activo
		               FROM usuario WHERE correo=? AND contraseña=? AND activo=1`;

		let rowLogin = await connection.executeQuery(query, [correo, contraseña]);

		return rowLogin;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

consultaUsuarios = async () => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `SELECT * FROM usuario`;

		const rowsUsuarios = await connection.executeQuery(query, []);

		return rowsUsuarios;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

registraUsuario = async (userData) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `INSERT INTO usuario (idUsu,nombre,correo,contraseña,tipoUsuario,idInstituto,telefono,fechaCreacion,activo) 
		               VALUES (?,?,?,?,?,?,?,?,?)`;

		const usuario = await connection.executeQuery(query, [...Object.values(userData), 1]);

		return usuario;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

getUsuariosPorGrupo = async (data) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `
      SELECT u.idUsu, u.nombre
      FROM grupo_usuario gu
      JOIN usuario u ON gu.idUsu = u.idUsu
      WHERE gu.idGrupo = ?
    `;

		const rowsUsuarios = await connection.executeQuery(query, [data.idGrupo]);

		return rowsUsuarios;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

getCountUsuariosPorGrupo = async (data) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `SELECT COUNT(*) AS count FROM grupo_usuario WHERE idGrupo=?`;

		const countUsuarios = await connection.executeQuery(query, [data.idGrupo]);

		return countUsuarios;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

buscaPorIdUsuario = async (userData) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `SELECT nombre,correo,contraseña,tipoUsuario,telefono,activo FROM usuario WHERE idUsu=?`;

		const rowUsuario = await connection.executeQuery(query, [userData.idUsu]);

		return rowUsuario;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

actualizaUsuario = async (userData) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `UPDATE usuario SET nombre=?,correo=?,contraseña=?,tipoUsuario=?,idInstituto=?,telefono=?,fechaCreacion=?,
		               activo=? WHERE idUsu=?`;

		const rowUsuario = await connection.executeQuery(query, [...Object.values(userData)]);

		return rowUsuario;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

eliminaUsuario = async (userData) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `UPDATE usuario SET activo=? WHERE idUsu=?`;

		const rowUsuario = await connection.executeQuery(query, [2, userData.idUsu]);

		return rowUsuario;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

module.exports = {
	login,
	consultaUsuarios,
	registraUsuario,
	buscaPorIdUsuario,
	actualizaUsuario,
	eliminaUsuario,
	getUsuariosPorGrupo,
	getCountUsuariosPorGrupo,
};
