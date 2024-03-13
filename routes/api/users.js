const express = require('express');
const router = express.Router();

const usersCtrl = require('../../controllers/api/users');

router.post('/signup', usersCtrl.signUp); 
router.post('/login', usersCtrl.login);
router.put('/addMatch', usersCtrl.addMatch);
router.get('/getUsers', usersCtrl.getUsers);
router.get('/genderedUsers', usersCtrl.genderedUsers);
router.put('/user', usersCtrl.user);
router.get('/users', usersCtrl.users)
router.get('/messages', usersCtrl.messages);


module.exports = router;