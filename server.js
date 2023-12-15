const express = require("express");
const expresshbs = require("express-handlebars");
const session = require("express-session");
const sequelize = require("./config/connection");
const sequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const handlebars = expresshbs.create({helpers: require("./utils/helpers")});
const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
    secret: "Confidential Information",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({db: sequelize,}),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("assets"));
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(session({
    secret: process.env.SECRET,
    store: new sequelizeStore({db: sequelize}),
    resave: false,
    saveUninitialized: false,
})
);
app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Listening to PORT ${PORT} now`));
});