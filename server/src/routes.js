const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const LoginController = require('./controllers/LoginController');
const RegisterController = require('./controllers/RegisterController');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const { isAuth } = require('./app/middleware');

app.use('/api', cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', isAuth, UserController.All);
app.delete('/api/users', isAuth, UserController.Destroy);
app.post('/api/users/block', isAuth, UserController.Block);
app.post('/api/users/unblock', isAuth, UserController.Unblock);
app.post('/api/users/logout', isAuth, UserController.Logout);

app.post('/api/users', RegisterController);
app.post('/api/users/login', LoginController);
app.post('/api/users/session', SessionController);

app.listen(port, () => {
  console.log(`Serving  http://127.0.0.1:${port}`);
});
