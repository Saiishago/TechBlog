const router = require("express").Router();
const {Comment, Post, User} = require("../models");
const wAuth = require("../utils/auth");

router.get("/", async(req,res) => {
    try {
        const postD = await Post.findAll({
            include: [{model: User, attributes: ["username"]}],
        });
        const posts = postD.map((post) => post.get({plain: true}));
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err){
        res.status(500).json(err);
    }
});

router.get("/post/:id", wAuth, async(req,res) => {
    try {
        const postD = await Post.findByPk(req.params.id, {
            include: [{model: User, attributes: ["username"]},
            {model: Comment,
            include: [{model: User, attributes: ["username"]}],
           },
          ],
        });
        const post = postD.get({plain: true});
        res.render("post", {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/dash", wAuth, async(req,res) => {
    try {
        const postD = await Post.findAll({
            where: {user_id: req.session.user_id},
            include: [{model: User, attributes: ["username"]}],
        });
        const posts = postD.map((post) => post.get({plain: true}));
        res.render("dash", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err){
        res.status(500).json(err);
    }
});

router.get("/login", (req,res) => {
    if(req.session.logged_in){
        res.redirect("/dash");
        return;
    }
    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/dash");
      return;
    }
    res.render("signup");
});

router.get("/newpost", (req, res) => {
    if (req.session.logged_in) {
      res.render("newpost");
      return;
    }
    res.redirect("/login");
});

router.get("/editpost/:id", async(req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
              { model: User, attributes: ["username"] },
              {
                model: Comment,
                include: [{ model: User, attributes: ["username"] }],
              },
            ],
        });
      
        const post = postData.get({ plain: true });
      
          res.render("editpost", {
            ...post,
            logged_in: req.session.logged_in,
          });
        } catch (err) {
          res.status(500).json(err);
    }
});
module.exports = router;