const sequelize = require("../config/connection");


const {Comment, Post, User} = require("../models");
const userD = require("./userD.json");
const postD = require("./postD.json")
const commentD = require("./commentD.json")

const seedDatabase = async() => {
    await sequelize.sync({force: true});
    await User.bulkCreate(userD);
    await Post.bulkCreate(postD);
    await Comment.bulkCreate(commentD);
    process.exit(0);
};

seedDatabase();