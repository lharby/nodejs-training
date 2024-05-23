const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('<p>Hello from Express</p>');
});

module.exports = router;