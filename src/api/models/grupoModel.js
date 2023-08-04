const mysqlConnectionSync = require('../../config/databaseSync');

registraGrupo = async (grupoData) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `INSERT INTO grupo (idGrupo,idCurso,nombre,color,maxIntegrantes,descripcion,idUsuAdmin,privado,tipo)
                    VALUES (?,?,?,?,?,?,?,?,?)`;

		const grupo = await connection.executeQuery(query, [...Object.values(grupoData), 1]);

		return grupo;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

registraUsuario = async (data) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `INSERT INTO grupo_usuario (idGrupo,idUsu) VALUES (?, ?)`;

		const rowGrupoUsuario = await connection.executeQuery(query, [data.idGrupo, data.idUsu]);

		return rowGrupoUsuario;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

eliminaUsuario = async (data) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `DELETE FROM grupo_usuario WHERE idGrupo = ? AND idUsu = ?`;

		const rowGrupoUsuario = await connection.executeQuery(query, [data.idGrupo, data.idUsu]);

		return rowGrupoUsuario;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

getGruposPorUsuario = async (data) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `SELECT idGrupo FROM grupo_usuario WHERE idUsu=?`;

		const rowsGrupos = await connection.executeQuery(query, [data.idUsu]);

		return rowsGrupos;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

getGruposPorCurso = async (grupoData) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `SELECT * FROM grupo WHERE idCurso = ?`;

		const grupos = await connection.executeQuery(query, [grupoData.idCurso]);

		return grupos;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

actualizaGrupo = async (grupoData) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `UPDATE grupo SET idCurso=?,nombre=?,color=?,maxIntegrantes=?,descripcion=?,tipo=?,idUsuAdmin=?,privado=? WHERE idGrupo=?`;

		const rowGrupo = await connection.executeQuery(query, [...Object.values(grupoData)]);

		return rowGrupo;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

eliminaGrupo = async (grupoData) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `DELETE FROM grupo WHERE idGrupo = ?`;

		const rowGrupo = await connection.executeQuery(query, [grupoData.idGrupo]);

		return rowGrupo;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

module.exports = {
	getGruposPorCurso,
	getGruposPorUsuario,
	registraGrupo,
	actualizaGrupo,
	eliminaGrupo,
	registraUsuario,
	eliminaUsuario,
};
