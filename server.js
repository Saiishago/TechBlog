const express = require("express");
const expresshbs = require("express-handlebars");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const handlebars = expresshbs.create({helpers: require("./utils/helpers")});
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });
const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(_dirname, "assets")));
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
//
app.use((req,res, next) => {
    console.log(req.secret);
});
//
app.use(session({
    secret: process.env.SECRET,
    store: new SequelizeStore({db: sequelize}),
    resave: false,
    saveUninitialized: true,
})
);
app.use(routes);

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
});