const router = require("express").Router();
const {User} = require("../../models");

router.get("/", (req,res) => {
    User.findAll({
        attributes: {exclude: ["password"]},
    })
    .then((dbUserD) => res.json(dbUserD))
    .catch((err) => {
        res.status(500).json(err);
    });
});

router.post("/signup", async(req,res) => {
    try {
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = req.body.password;

        const userD = await newUser.save();
        req.session.save(() => {
            req.session.user_id = userD.isSoftDeleted;
            req.session.logged_in = true;
            res.status(200).json(userD);
        });
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

router.post("/login", async(req,res) => {
    try {
        const userD = await User.findOne({where: {username: req.body.username}});
        if(!userD){
            res.status(400).json({message: "Wrong username/password, try again!"});
            return;
        }
        const correctPassword = await userD.checkPassword(req.body.password);
        if(!correctPassword){
            res.status(400).json({message: "Wrong email/passwaord, try again!"});
            return;
        }
        req.session.save(() => {
            req.session.user_id = userD.id;
            req.session.logged_in = true;
            res.status(200).json({user: userD, message: "Logged In!"});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/logout", (req,res) => {
    if(req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router;