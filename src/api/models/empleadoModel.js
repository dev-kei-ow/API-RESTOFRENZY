const mysqlConnectionSync = require('../../config/databaseSync');

login = async (usuario, contraseña) => {
	let connection = await mysqlConnectionSync.getConnection();
  
	try {
	  const query = `SELECT idEmpleado, idAdmin, nombres, apellidos, salario, nacimiento, direccion, telefono, correo, usuario, contraseña, idSucursal, idCargo, idTipoEmpleado
					 FROM empleado WHERE usuario=? AND contraseña=?`;
  
	  let rowLogin = await connection.executeQuery(query, [usuario, contraseña]);
  
	  return rowLogin;
	} catch (err) {
	  console.log(err);
	  throw err;
	} finally {
	  connection.close();
	}
  };

  consultaEmpleado = async () => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
	  const query = `SELECT * FROM empleado`;
	  const rowsEmpleados = await connection.executeQuery(query, []);
	  return rowsEmpleados;
	} catch (err) {
	  console.log(err);
	  throw err;
	} finally {
	  connection.close();
	}
  };


registraEmpleado = async (userData) => {
	let connection = await mysqlConnectionSync.getConnection();

	try {
		const query = `INSERT INTO empleado (idEmpleado, idAdmin, nombres, apellidos, salario, nacimiento,
			 direccion, telefono, correo, usuario, contraseña, idSucursal, idCargo, idTipoEmpleado) 
		               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

		const empleado = await connection.executeQuery(query, [...Object.values(userData), 1]);

		return empleado;
	} catch (err) {
		console.log(err);
		throw err;
	} finally {
		connection.close();
	}
};


actualizaEmpleado = async (empleadoData) => {
	let connection = await mysqlConnectionSync.getConnection();
  
	try {
	  const query = `UPDATE empleado SET idAdmin=?, nombres=?, apellidos=?, salario=?, nacimiento=?, direccion=?, telefono=?,
					 correo=?, usuario=?, contraseña=?, idSucursal=?, idCargo=?, idTipoEmpleado=? WHERE idEmpleado=?`;
  
	  const rowEmpleado = await connection.executeQuery(query, [...Object.values(empleadoData)]);
  
	  return rowEmpleado;
	} catch (err) {
	  console.error(err);
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
	consultaEmpleado,
	registraEmpleado,
	buscaPorIdUsuario,
	actualizaEmpleado,
	eliminaUsuario,
	getCountUsuariosPorGrupo,
};
