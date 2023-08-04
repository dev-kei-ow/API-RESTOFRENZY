const mysqlConnectionSync = require('../../config/databaseSync');

consultaCursos = async () => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `SELECT * FROM curso`;

		const rowsCursos = await connection.executeQuery(query, []);

		return rowsCursos;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

registraCurso = async (cursoData,id) => {
	let registrarGrupo, registrarUsuGrupo, registrarUsuCurso;
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `INSERT INTO curso (idCurso,idUsuAdmin,idCatCurso,nombre,color,descripcion,fechaCreacion)
                   VALUES (?,?,?,?,?,?,?)`;

		const curso = await connection.executeQuery(query, [...Object.values(cursoData)]);

		let grupo = {
			idGrupo: id,
			idCurso: cursoData.idCurso,
			nombre: 'General',
			color: 'Rojo',
			maxIntegrantes: 0,
			descripcion: 'Este es el grupo general del curso, aquí podras conversar de cualquier tema sobre este.',
			idUsuAdmin: cursoData.idUsuAdmin,
			privado: 0,
			tipo: 2
		}
		const query2 = `INSERT INTO grupo (idGrupo,idCurso,nombre,color,maxIntegrantes,descripcion,idUsuAdmin,privado,tipo)
		VALUES (?,?,?,?,?,?,?,?,?)`;
		registrarGrupo = await connection.executeQuery(query2, [...Object.values(grupo)]);

		const query3 = `INSERT INTO grupo_usuario (idGrupo,idUsu) VALUES (?, ?)`;
		registrarUsuGrupo = await connection.executeQuery(query3, [id, cursoData.idUsuAdmin]);

		const query4 = `INSERT INTO curso_usuario (idCurso,idUsu) VALUES (?, ?)`;
		registrarUsuCurso = await connection.executeQuery(query4, [cursoData.idCurso, cursoData.idUsuAdmin]);
		
		return curso;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

getCursosPorUsuario = async (idUsu) => {
	let idCursos, idCategoria, rowsCursosDelUsuario, respuesta;

	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query1 = `SELECT idCurso FROM curso_usuario WHERE idUsu=?`;

		const idCursosResult = await connection.executeQuery(query1, [idUsu]);

		idCursos = idCursosResult.map((objeto) => objeto.idCurso.toString());
		
		const idCursosString = idCursos.map((id) => `'${id}'`).join(',');

		const query2 = `SELECT * FROM curso WHERE idCurso IN (${idCursosString})`;

		rowsCursosDelUsuario = await connection.executeQuery(query2, []);

		idCategoria = [...new Set(rowsCursosDelUsuario.map((objeto) => objeto.idCatCurso))];

		const query3 = `SELECT * FROM categoriaCurso WHERE idCatCurso IN (${idCategoria.join(
			','
		)})`;

		respuesta = await connection.executeQuery(query3, []);

		const arregloCursosConNombreCat = rowsCursosDelUsuario.map((curso) => {
			const categoria = respuesta.find((cat) => cat.idCatCurso === curso.idCatCurso);

			return { ...curso, nombreCat: categoria.nombre };
		});
		// console.log(arregloCursosConNombreCat);

		/*DEVUELVE EL RESULTADO DE LAS CONSULTAS*/
		return arregloCursosConNombreCat;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

getAdminPorCurso = async (cursoData) => {
	//Creamos la conexion y hacemos la consulta concatenando con la variable obtenida anteriormente
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `SELECT nombre,idUsuAdmin FROM curso WHERE idCurso=?`;

		const rowsAdminCurso = await connection.executeQuery(query, [cursoData.idCurso]);

		return rowsAdminCurso;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

actualizaCurso = async (cursoData) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `UPDATE curso SET idUsuAdmin=?,idCatCurso=?,nombre=?,color=?,descripcion=?,fechaCreacion=? WHERE idCurso=?`;

		const rowCurso = await connection.executeQuery(query, [...Object.values(cursoData)]);

		return rowCurso;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

eliminaCurso = async (cursoData) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `DELETE FROM curso WHERE idCurso = ?`;

		const rowCurso = await connection.executeQuery(query, [cursoData.idCurso]);

		return rowCurso;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

module.exports = {
	consultaCursos,
	registraCurso,
	getCursosPorUsuario,
	actualizaCurso,
	eliminaCurso,
	getAdminPorCurso,
};
