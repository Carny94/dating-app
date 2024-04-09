const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// User-related routes
router.post('/signup', usersCtrl.signUp); 
router.post('/login', usersCtrl.login);
router.get('/getUsers', usersCtrl.getUsers);
router.put('/addMatch', usersCtrl.addMatch);
router.get('/genderedUsers', usersCtrl.genderedUsers);
router.put('/user', usersCtrl.user);
router.get('/users', usersCtrl.users);

// Message-related routes
router.get('/messages', usersCtrl.messages);
router.post('/message', usersCtrl.message);

module.exports = router;
