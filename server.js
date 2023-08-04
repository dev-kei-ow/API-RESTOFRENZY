const express = require('express');
const app = express();
const usuarioRouter = require('./src/api/routes/usuarioRouter');
const cursoRouter = require('./src/api/routes/cursoRouter');
const grupoRouter = require('./src/api/routes/grupoRouter');
const tareaRouter = require('./src/api/routes/tareaRouter');
const cors = require('cors');
app.use(express.json({ limit: '100mb', extended: true }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(cors());

/*ROUTES*/
app.use('/api/usuario', usuarioRouter);
app.use('/api/curso', cursoRouter);
app.use('/api/grupo', grupoRouter);
app.use('/api/tarea', tareaRouter);

/*SETTINGS*/
app.set('port', process.env.PORT || 3000);

/*STARTING THE SERVER*/
app.listen(app.get('port'), () => {
	console.log('server on port', app.get('port'));
});
