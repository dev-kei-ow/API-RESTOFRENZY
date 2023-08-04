const mysqlConnectionSync = require('../../config/databaseSync');

registraTarea = async (tareaData) => {

	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `INSERT INTO tarea (idTarea,idPizarra,idGrupo,nombre,descripcion,color,idTag,estado,fechaCreacion)
                   VALUES (?,?,?,?,?,?,?,?,?)`;

		const tarea = await connection.executeQuery(query, [...Object.values(tareaData)]);
		
		return tarea;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

actualizaTarea = async (tareaData) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `UPDATE tarea SET idPizarra=?,idGrupo=?,nombre=?,descripcion=?,color=?,idTag=?,estado=?,fechaCreacion=? WHERE idTarea=?`;

		const rowTarea = await connection.executeQuery(query, [...Object.values(tareaData)]);

		return rowTarea;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

eliminaTarea = async (tareaData) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `DELETE FROM tarea WHERE idTarea = ?`;

		const rowTarea = await connection.executeQuery(query, [tareaData.idTarea]);

		return rowTarea;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};

module.exports = {
	registraTarea,
	actualizaTarea,
	eliminaTarea,
};
