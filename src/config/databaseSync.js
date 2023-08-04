const mysql = require('mysql');
const BaseDatabase = require('mysql-async-wrapper').default;

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

/*
  const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    socketPath: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    connectionLimit: 10
  })*/


const pool = mysql.createPool({
	connectionLimit: 3,
	host: '35.199.68.115',
	user: 'root',
	password: 'Idat123',
	database: 'hereAndNow',
});


pool.getConnection((err, connection) => {
	if (err) {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			console.error('Database connection was closed.');
		}
		if (err.code === 'ER_CON_COUNT_ERROR') {
			console.error('Database has too many connections.');
		}
		if (err.code === 'ECONNREFUSED') {
			console.error('Database connection was refused.');
		}
	}
	if (connection) {
		connection.release();
		console.log('Db is connected');
	}

	return;
});

const db = new BaseDatabase(pool);

module.exports = db;
