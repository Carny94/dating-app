const express = require('express');
const router = express.Router();

const usersCtrl = require('../../controllers/api/users');

router.post('/signup', usersCtrl.signUp); 
router.get('/genderedUsers', usersCtrl.genderedUsers);
router.post('/login', usersCtrl.login);
router.put('/user', usersCtrl.user);
router.get('/getUser', usersCtrl.getUsers);
router.put('/addMatch', usersCtrl.addMatch);
// router.get('/users', usersCtrl.users)


module.exports = router;