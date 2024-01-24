const express = require('express');
const router = express.Router();

const dashboardPageCtrl = require('../../controllers/api/dashboard');

router.get('/', dashboardPageCtrl.create);

module.exports = router;