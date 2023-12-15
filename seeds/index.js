const sequelize = require("../config/connection");
const commentD = require("./commentD.json");
const postD = require("./postD.json");
const userD = require("./userD.json");

const {Comment, Post, User} = require("../models");

const seedWhole = async() => {
  try{
    await sequelize.sync({force: true});
    await Comment.bulkCreate(commentD);
    await Post.bulkCreate(postD);
    await User.bulkCreate(userD);
    //process.exit(0);
    console.log("seeding success!");
  } catch (err) {
    console.error("Could not seed.");
  } finally {
    await sequelize.close();
  }
};

seedWhole();