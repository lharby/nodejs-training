const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const rootDir = require('./utils/path');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.engine('handlebars', handlebars.engine({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.render('404', {docTitle: 'Error 404'});
});

app.listen(3000);
