const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const hbs= exphbs.create({helpers: require("./utils/helpers")});
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

// app.get('/css/style.css', function(req, res) {
//     res.setHeader('Content-Type', 'text/css');
// });
  
app.use(session(sess))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'assests')));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
//
// app.use((req,res, next) => {
//     console.log(req.secret);
// });
//

app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
});
