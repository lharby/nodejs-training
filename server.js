const http = require("http");

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRouters = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(adminRoutes);
app.use(shopRouters);

app.use((req, res, next) => {
    res.status(404).send('<p>Uh oh, page not found</p>');

});

app.listen(3000);
