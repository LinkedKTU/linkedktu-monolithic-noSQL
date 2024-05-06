const express = require('express');
const router = express.Router();
const { accountSelector } = require('../controllers/account.controller');

router.post('/select', accountSelector);

module.exports = router;
