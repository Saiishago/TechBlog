const sequelize = require("../config/connection");
const seedComment = require("./commentD");
const seedPost = require("./postD");
const seedUser = require("./userD");

const seedWhole = async() => {
    await sequelize.sync({force: true});
    await seedComment();
    await seedPost();
    await seedUser();
    process.exit(0);
};

seedWhole();