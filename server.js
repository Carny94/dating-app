const express = require('express');
 const path = require('path');
 const favicon = require('serve-favicon');
 const logger = require('morgan');
 const cors = require('cors');
const { signUp, login, user, getUsers  } = require('./controllers/api/users');
const router = require('./routes/api/users'); 

require('dotenv').config();
require('./config/database');
	
 const app = express();
	
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use('/api', router); 
 
 app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
 app.use(express.static(path.join(__dirname, 'build')));

 app.use('/users', require('./routes/api/users'));
 app.post('/signup', signUp);
 app.post('/login', login);
 router.get('/getUsers', getUsers);

 app.put('/user', user);

 
 app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
	
const port = process.env.PORT || 3001;

 app.listen(port, function() {
   console.log(`Express app running on port ${port}`)
 });