let mongoose = require('mongoose')

let util = require('../libs/util')
/**Models */
const CommentModel = mongoose.model('Comment')

let insertCommentInList = async (req, res) => {
    try {
        let commentText = req.body.commentText;
        let createdAt = req.body.createdAt;
        let user = req.body.user;
        let sessionId = req.body.sessionId;

        console.log('############################createdAt');
        console.log(createdAt);

            let commentId = util.getRandomSessionId();
                let createComment = new CommentModel({
                    user: user,
                    sessionId: sessionId,
                    createdAt: createdAt,
                    commentText: commentText,
                    commentId: commentId
                });
                
                let createdUser = await createComment.save();
            
        res.status(200).send({ statusCode: 200, data: createComment})
    
    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}

let getCommentListBySessionId = async (req, res) => {
    try {
        let sessionId = req.params.sessionId;
        let findCommentList = await CommentModel.find({ sessionId: sessionId});
    
        res.status(200).send({ statusCode: 200, data: findCommentList })

    } catch (err) {
        res.status(500).send({ statusCode: 500, reason: `${err}` })
    }
}


module.exports = {
    insertCommentInList,
    getCommentListBySessionId
}