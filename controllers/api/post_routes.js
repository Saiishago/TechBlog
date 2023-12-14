const router = require("express").Router();
const {Comment, Post, User} = require("../../models");
const wAuth = require("../../utils/auth");

router.get("/", async(req,res) => {
    try{
        const postD = await Post.findAll({
            include: [{model: User, attributes: ["username"]}],
        });
        res.status(200).json(postD);
    } catch (err){
        res.status(500).json(err);
    }
});

router.get("/:id", async(req,res) => {
    try{
        const postD = await Post.findByPk(req.params.id, {
            include: [{model: User, attributes:["username"]},
        {model: Comment,
        include: [{model: User, attributes: ["username"]}],
       },
     ],
    });
    if(!postD){
        res.status(404).json({message: "No post matching id found!"});
        return;
    }
    res.status(200).json(postD);
  } catch (err){
    res.status(500).json(err);
  }
});

router.post("/", wAuth, async(req, res) =>{
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", wAuth, async(req, res) => {
    try {
        const updatedP = await Post.update(req.body, {
            where: {id: req.params.id},
        });
        if(!updatedP){
            res.status(404).json({message: "nothing found with that id."});
            return;
        }
        res.status(200).json(updatedP);
    } catch (err){
        res.status(500).json(err);
    }
});

router.delete("/:id", wAuth, async(req,res) => {
    try {
        await Comment.destroy({
            where: {post_id: req.params.id},
        });
        const deletedP = await Post.destroy({
            where: {id: req.params.id},
        });
        if(!deletedP){
            res.status(404).json({message: "Nothing found matching id."});
            return;
        }
        res.status(200).json(deletedP);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;