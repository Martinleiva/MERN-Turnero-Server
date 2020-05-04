// Routes send mail
const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

//Send mail
// api/send-mail

router.post('/', 
   mailController.sendEmail
);

module.exports = router;