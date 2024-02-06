const express = require('express');
const router = express.Router();

const usersCtrl = require('../../controllers/api/users');

router.post('/signup', usersCtrl.signUp); 
router.get('/', usersCtrl.getAllUsers);
router.post('/login', usersCtrl.login);
router.put('/user', usersCtrl.user);



module.exports = router;