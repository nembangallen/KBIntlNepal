const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.all('/*', (req, res, next) => {
    // req.app.locals.layout = '';
    next();
})

router.route('/')
    .get(adminController.index);


router.route('/register')
    .get(adminController.register);

module.exports = router;