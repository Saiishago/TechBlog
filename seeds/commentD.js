const {Comment} = require("../models");
const commentD = [
    {
        comment_text: "Great post!",
        user_id: 1,
        post_id: 1,
      },
      {
        comment_text: "This is very informative!",
        user_id: 2,
        post_id: 1,
      },
      {
        comment_text: "Totally agree with this post!",
        user_id: 3,
        post_id: 1,
      },
      {
        comment_text: "Yeah, uhm no.",
        user_id: 4,
        post_id: 1,
      },
      {
        comment_text: "I disagree with you!",
        user_id: 5,
        post_id: 1,
      },
      {
        comment_text: "Great post!",
        user_id: 1,
        post_id: 2,
      },
      {
        comment_text: "I agree with you!",
        user_id: 2,
        post_id: 2,
      }
];

const seedComment = () => Comment.bulkCreate(commentD);
module.exports = seedComment;