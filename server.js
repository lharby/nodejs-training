const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/database');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
